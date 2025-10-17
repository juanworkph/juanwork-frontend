export type MessageStatus = "sent" | "delivered" | "read";
export type UserStatus = "online" | "offline" | "away";

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  reactions?: string[];
  replyTo?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface MessagesState {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  activeConversation: string | null;
  currentUser: User;
}

// Helper functions
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "Just now";
  } else if (diffMins < 60) {
    return `${diffMins}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
};

export const formatFullTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Mock data
const currentUser: User = {
  id: "current-user",
  name: "You",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  status: "online",
};

const users: User[] = [
  {
    id: "user-1",
    name: "Philia Pipol (Family Friendly Edition)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-2",
    name: "Angel Domingo",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-3",
    name: "PP | PhiliaPipol Esports",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-4",
    name: "VALO COMMUNITY",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-5",
    name: "INQUIRER.me",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    status: "away",
  },
  {
    id: "user-6",
    name: "Pastor",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-7",
    name: "Kieng Bancud",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-8",
    name: "JUANWORK | IT",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-9",
    name: "Lester Leal",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "online",
  },
  {
    id: "user-10",
    name: "Lemuel Orpilla",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "offline",
  },
];

export const mockMessagesData: MessagesState = {
  conversations: [
    {
      id: "conv-1",
      participants: [users[0]],
      lastMessage: {
        id: "msg-1-5",
        conversationId: "conv-1",
        senderId: users[0].id,
        content: "Kaya focus muna sa goal",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-2",
      participants: [users[1]],
      lastMessage: {
        id: "msg-2-1",
        conversationId: "conv-2",
        senderId: users[1].id,
        content: "wala na kasing nakalagay sa contact sa fb hel...",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        status: "delivered",
      },
      unreadCount: 1,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-3",
      participants: [users[2]],
      lastMessage: {
        id: "msg-3-1",
        conversationId: "conv-3",
        senderId: users[2].id,
        content: "Ghazt: w8 ingame",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        status: "delivered",
      },
      unreadCount: 1,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-4",
      participants: [users[3]],
      lastMessage: {
        id: "msg-4-1",
        conversationId: "conv-4",
        senderId: "current-user",
        content: "Yum: salm added Wiz Herly to the group.",
        timestamp: new Date(Date.now() - 36 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: true,
    },
    {
      id: "conv-5",
      participants: [users[4]],
      lastMessage: {
        id: "msg-5-1",
        conversationId: "conv-5",
        senderId: users[4].id,
        content: "Narvasa City Representative Toby Tiangco has aga...",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-6",
      participants: [users[5]],
      lastMessage: {
        id: "msg-6-1",
        conversationId: "conv-6",
        senderId: users[5].id,
        content: "sent an attachment.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-7",
      participants: [users[6]],
      lastMessage: {
        id: "msg-7-1",
        conversationId: "conv-7",
        senderId: "current-user",
        content: "You: copy po ma'am",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-8",
      participants: [users[7]],
      lastMessage: {
        id: "msg-8-1",
        conversationId: "conv-8",
        senderId: users[7].id,
        content: "Kleng: Si @Krish Ochoa na magbayad dun",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-9",
      participants: [users[8]],
      lastMessage: {
        id: "msg-9-1",
        conversationId: "conv-9",
        senderId: "current-user",
        content: "You: Oo ganyan lng, para goods lahat hahaha",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
    {
      id: "conv-10",
      participants: [users[9]],
      lastMessage: {
        id: "msg-10-1",
        conversationId: "conv-10",
        senderId: "current-user",
        content: "You: cge tgc",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isGroup: false,
    },
  ],
  messages: {
    "conv-1": [
      {
        id: "msg-1-1",
        conversationId: "conv-1",
        senderId: "current-user",
        content: "Bro",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        status: "read",
      },
      {
        id: "msg-1-2",
        conversationId: "conv-1",
        senderId: "current-user",
        content: "Do the main objective before new features hahahah",
        timestamp: new Date(Date.now() - 59 * 60 * 1000).toISOString(),
        status: "read",
        reactions: ["😊"],
      },
      {
        id: "msg-1-3",
        conversationId: "conv-1",
        senderId: users[0].id,
        content: "Di panga tayu tapos overall eh hahahah",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        status: "read",
        reactions: ["😊"],
      },
      {
        id: "msg-1-4",
        conversationId: "conv-1",
        senderId: users[0].id,
        content: "Saka pag may ganyan nag mumukang pay to win",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        status: "read",
        reactions: ["❤️"],
      },
      {
        id: "msg-1-5",
        conversationId: "conv-1",
        senderId: users[0].id,
        content: "Kaya focus muna sa goal",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: "read",
      },
    ],
  },
  activeConversation: "conv-1",
  currentUser,
};
