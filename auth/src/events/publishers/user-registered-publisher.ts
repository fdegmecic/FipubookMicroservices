import {Publisher, Subjects, UserRegisteredEvent} from "@fdfipubook/common";

export class UserRegisteredPublisher extends Publisher<UserRegisteredEvent> {
    readonly subject = Subjects.UserRegistered;
}