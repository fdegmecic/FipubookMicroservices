import {Publisher, Subjects, PostUpdatedEvent} from "@fdfipubook/common";

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    readonly subject = Subjects.PostUpdated;
}