import List from "./list/List";
import Detail from "./detail/Detail";
import ChatArea from "./chatArea/ChatArea";
import useChatStore from "../../stores/ChatStore";

const Chat = () => {

    const { chatUser, isDetailOpen } = useChatStore();

    return (
        <>
            <List />
            <ChatArea />
            { chatUser && isDetailOpen && <Detail />}
        </>
    )
};

export default Chat;