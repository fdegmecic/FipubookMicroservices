import {Publisher, Subjects, PostLikedEvent} from "@fdfipubook/common";

export class PostLikedPublisher extends Publisher<PostLikedEvent> {
    readonly subject = Subjects.PostLiked;
}