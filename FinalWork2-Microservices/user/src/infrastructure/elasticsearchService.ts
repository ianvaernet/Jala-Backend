import { injectable } from 'inversify';
import { Client } from '@elastic/elasticsearch';
import { SearchService } from '../application/searchService';
import { User } from '../domain/user';
import { UserMapper } from './userMapper';

@injectable()
export class ElasticsearchService implements SearchService {
  public elasticsearch: any;

  constructor() {
    this.elasticsearch = new Client({ node: { url: new URL(process.env.ELASTICSEARCH_HOST as string) } });
  }

  public async indexUser(user: User) {
    await this.elasticsearch.index({
      index: 'users',
      document: UserMapper.toPersistence(user),
    });
  }

  public async searchUsers(search: string) {
    const query = {
      index: 'users',
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
}
