import {Publisher, Subjects, PostCreatedEvent} from "@fdfipubook/common";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    readonly subject = Subjects.PostCreated;
}