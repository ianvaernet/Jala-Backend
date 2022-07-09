import { injectable } from 'inversify';
import { Client } from '@elastic/elasticsearch';
import { SearchService } from '../application/searchService';
import { User } from '../domain/user';
import { UserMapper } from './userMapper';

@injectable()
export class ElasticsearchService implements SearchService {
  public elasticsearch: Client;
  private readonly index = 'users';

  constructor() {
    this.elasticsearch = new Client({ node: { url: new URL(process.env.ELASTICSEARCH_HOST as string) } });
    this.elasticsearch.indices.exists({ index: this.index }).then((indexExists) => {
      if (!indexExists) {
        this.elasticsearch.indices.create({
          index: this.index,
        });
      }
    });
  }

  public async indexUser(user: User) {
    await this.elasticsearch.index({
      index: this.index,
      id: user.id.getValue(),
      document: UserMapper.toPersistence(user),
    });
  }

  public async updateUser(id: string, user: User) {
    await this.elasticsearch.update({
      index: this.index,
      id,
      doc: UserMapper.toPersistence(user),
    });
  }

  public async searchUsers(search: string) {
    const query = {
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: search,
            fields: ['id', 'nickname', 'fullName'],
          },
        },
      },
    };
    const data = await this.elasticsearch.search(query);
    const usersFound = data.hits.hits;
    const users = usersFound.map((userFound: any) => UserMapper.toDomain(userFound._source));
    return users;
  }

  public async deleteUser(id: string) {
    await this.elasticsearch.delete({
      index: this.index,
      id,
    });
  }
}
