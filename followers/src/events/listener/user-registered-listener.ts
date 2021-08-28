import {Message} from 'node-nats-streaming';
import {Subjects, Listener, UserRegisteredEvent} from "@fdfipubook/common";
import {User} from "../../models/user";
import {queueGroupName} from "./queue-group-name";

export class UserRegisteredListener extends Listener<UserRegisteredEvent> {
    readonly subject = Subjects.UserRegistered;
    queueGroupName = queueGroupName;

    async onMessage(data: UserRegisteredEvent["data"], msg: Message) {
        const {id, name, avatar} = data;

        const user = User.build({
            id, name, avatar
        });
        await user.save();

        msg.ack();
    }
}
