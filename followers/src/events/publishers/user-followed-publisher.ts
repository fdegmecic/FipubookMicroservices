import {Publisher, Subjects, UserFollowedEvent} from "@fdfipubook/common";

export class UserFollowedPublisher extends Publisher<UserFollowedEvent> {
    readonly subject = Subjects.UserFollowed;
}