import { useAuth } from '../../context/AuthContext';
import { Channel as ChannelType } from 'stream-chat';
import { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Window,
  useCreateChatClient,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';
import '../../app/globals.css';

type Props = {
  channelId: string;
};
const API_KEY = import.meta.env.VITE_EXPO_PUBLIC_STREAM_ACCESS_KEY!;

const ChatView = ({ channelId }: Props) => {    
  const { authState } = useAuth();
  const [channel, setChannel] = useState<ChannelType | undefined>();
  const clientId: string = authState?.user_id ?? '';
  const chatClient = useCreateChatClient({
    apiKey: API_KEY,
    tokenOrProvider: authState?.token,
    userData: { id: clientId },
  });
    // const client = StreamChat.getInstance(API_KEY);

  useEffect(() => {
    const connectToChannel = async () => {
      if (!authState?.user_id || !authState?.token) {
        console.error('User ID or token is missing.');
        return;
      }

      try {
        const user = { id: authState.user_id };
        console.log('Connecting user:', user);

        // await chatClient.connectUser(user, authState.token);
        // console.log('User connected');
        if (!chatClient) return null; 

        const channel = chatClient.channel('messaging', channelId, {
            name: 'Stream Meeting',
            members: [authState.user_id]
        });
        setChannel(channel);
        await channel.watch();
        console.log('Channel watched:', channelId);
      } catch (error) {
        console.error('Error connecting to the channel:', error);
      }
    };

    connectToChannel();

    return () => {
      if (channel) {
        channel.stopWatching();
        chatClient?.disconnectUser();
      }
    };
  }, [authState, chatClient, channelId]);

  return (
    <>
      {chatClient && channel ? (
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      ) : (
        <div>
          <h1>Loading Chat ....</h1>
        </div>
      )}
    </>
  );
};

export default ChatView;
