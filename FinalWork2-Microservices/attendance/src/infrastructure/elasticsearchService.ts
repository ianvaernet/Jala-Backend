import { injectable } from 'inversify';
import { Client } from '@elastic/elasticsearch';
import { SearchService } from '../application/searchService';
import { Attendance } from '../domain/attendance';
import { AttendanceMapper } from './attendanceMapper';

@injectable()
export class ElasticsearchService implements SearchService {
  public elasticsearch: Client;
  private readonly index = 'attendances';

  constructor() {
    this.elasticsearch = new Client({ node: { url: new URL(process.env.ELASTICSEARCH_HOST as string) } });
    this.elasticsearch.indices.exists({ index: this.index }).then((indexExists) => {
      if (!indexExists) {
        this.elasticsearch.indices.create({
          index: this.index,
          body: {
            mappings: { properties: { startDate: { type: 'text' }, endDate: { type: 'text' } } },
          },
        });
      }
    });
  }

  public async indexAttendance(attendance: Attendance) {
    await this.elasticsearch.index({
      index: this.index,
      id: attendance.id.getValue(),
      document: AttendanceMapper.toSerializable(attendance),
    });
  }

  public async searchAttendances(search: string) {
    const query = {
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: search,
            fields: ['id', 'startDate', 'endDate', 'notes', 'userId'],
          },
        },
      },
    };
    const data = await this.elasticsearch.search(query);
    const attendancesFound = data.hits.hits;
    const attendances = attendancesFound.map((attendanceFound: any) => AttendanceMapper.fromSerializable(attendanceFound._source));
    return attendances;
  }

  public async deleteAttendance(id: string) {
    await this.elasticsearch.delete({
      index: this.index,
      id,
    });
  }

  public async deleteUserAttendances(userId: string) {
    await this.elasticsearch.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            userId,
          },
        },
      },
    });
  }
}
