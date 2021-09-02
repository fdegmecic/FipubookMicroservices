import {Publisher, Subjects, UserUnfollowedEvent} from "@fdfipubook/common";

export class UserUnfollowedPublisher extends Publisher<UserUnfollowedEvent> {
    readonly subject = Subjects.UserUnfollowed;
}