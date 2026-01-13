export enum SocketEvent {
    // Common
    Connect = "connect",
    Disconnect = "disconnect",
    Error = "error",
    RevokeToken = "revoke-token",
    UserLastView = "user-last-view",
    GetUserOnline = "get-user-online",

    // Chat
    NewMessage = "new-message",
    NewMessageOfChannel = "new-message-of-channel",
    Typing = "typing",
    NotTyping = "not-typing",
    AddReaction = "add-reaction",
    ActionPinMessage = "action-pin-message",
    UpdateVoteMessage = "update-vote-message",

    // Conversation
    Join = "join",
    JoinConversations = "join-conversations",
    LeaveConversations = "leave-conversations",
    CreateIndividualConversation = "create-individual-conversation",
    CreateIndividualConversationWhenWasFriend = "create-individual-conversation-when-was-friend",
    CreateConversation = "create-conversation",
    DeleteConversation = "delete-conversation",
    Leave = "leave",
    RenameConversation = "rename-conversation",
    UpdateAvatarConversation = "update-avatar-conversation",
    UpdateChannel = "update-channel",
    UpdateMember = "update-member",
    LeaveConversation = "leave-conversation",

    // Friend
    AcceptFriend = "accept-friend",
    SendFriendInvite = "send-friend-invite",
    DeletedFriendInvite = "deleted-friend-invite",
    DeletedInviteWasSend = "deleted-invite-was-send",
    DeletedFriend = "deleted-friend",
    DeleteFriend = "delete-friend",
    AddedGroup = "added-group",
    DeleteGroup = "deleted-group",
    AddManagers = "add-managers",
    DeleteManagers = "delete-managers",

    // Channel
    NewChannel = "new-channel",
    DeleteChannel = "delete-channel",
}
