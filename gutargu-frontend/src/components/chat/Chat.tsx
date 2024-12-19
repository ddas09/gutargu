import List from "./list/List";
import Detail from "./detail/Detail";
import ChatArea from "./chatArea/ChatArea";
import useChatStore from "../../stores/ChatStore";

const Chat = () => {

    const { chatUser } = useChatStore();

    return (
        <>
            <List />
            <ChatArea />
            { chatUser && <Detail />}
        </>
    )
};

export default Chat;