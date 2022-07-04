import { Attendance } from '../types';
import { AggregateRoot } from './aggregateRoot';
import { UserFullName } from './valueObjects/userFullName';
import { UserId } from './valueObjects/userId';
import { UserNickname } from './valueObjects/userNickName';
import { UserTotalAttendance } from './valueObjects/userTotalAttendances';

type UserProps = {
  id: UserId;
  nickname: UserNickname;
  fullName: UserFullName;
  totalAttendance: UserTotalAttendance;
  attendances?: Attendance[];
};

type UserPrimitiveProps = {
  id: string;
  nickname: string;
  fullName: string;
  totalAttendance: number;
  attendances?: Attendance[];
};

export class User extends AggregateRoot<UserProps> {
  constructor(props: UserPrimitiveProps) {
    super(props);
    this.props.id = new UserId(props.id);
    this.props.nickname = new UserNickname(props.nickname);
    this.props.fullName = new UserFullName(props.fullName);
    this.props.totalAttendance = new UserTotalAttendance(props.totalAttendance);
    this.props.attendances = props.attendances;
  }

  get id(): UserId {
    return this.props.id;
  }
  get nickname(): UserNickname {
    return this.props.nickname;
  }
  get fullName(): UserFullName {
    return this.props.fullName;
  }
  get totalAttendance(): UserTotalAttendance {
    return this.props.totalAttendance;
  }
  get attendances(): Attendance[] | undefined {
    return this.props.attendances;
  }
  set attendances(attendances: Attendance[] | undefined) {
    this.props.attendances = attendances;
  }

  updateTotalAttendance(totalAttendance: number) {
    this.props.totalAttendance = new UserTotalAttendance(totalAttendance);
  }
}
