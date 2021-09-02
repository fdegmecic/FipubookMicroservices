import {Publisher, Subjects, PostUnlikedEvent} from "@fdfipubook/common";

export class PostUnlikedPublisher extends Publisher<PostUnlikedEvent> {
    readonly subject = Subjects.PostUnliked;
}