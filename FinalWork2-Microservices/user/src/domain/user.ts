import { UserFirstName } from './valueObjects/userFirstName';
import { UserId } from './valueObjects/userId';
import { UserLastName } from './valueObjects/userLastName';
import { UserNickname } from './valueObjects/userNickName';

type UserProps = {
  id: UserId;
  nickname: UserNickname;
  firstName: UserFirstName;
  lastName: UserLastName;
};

type UserPrimitiveProps = {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
};

export class User {
  private props: UserProps;
  constructor(props: UserPrimitiveProps) {
    this.props.id = new UserId(props.id);
    this.props.nickname = new UserNickname(props.nickname);
    this.props.firstName = new UserFirstName(props.firstName);
    this.props.lastName = new UserLastName(props.lastName);
  }

  get id(): UserId {
    return this.props.id;
  }
  get nickname(): UserNickname {
    return this.props.nickname;
  }
  get firstName(): UserFirstName {
    return this.props.firstName;
  }
  get lastName(): UserLastName {
    return this.props.lastName;
  }
}
