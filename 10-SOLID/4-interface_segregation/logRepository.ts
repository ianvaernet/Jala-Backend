import AppendableRepository from './appendableRepository';
import Log from './log';

export default class LogRepository implements AppendableRepository<Log> {
  insert(entity: Log): Log {
    console.log('insert ok');
    return new Log();
  }
}
