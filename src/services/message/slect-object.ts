export const ChatSelectObject = {
    select:{
        id: true,
        messages:{
            select:{
                id: true,
                content: true,
                senderId: true,
                createdAt: true,
                updatedAt: true,
                attachments:{
                    select:{
                        id: true,
                        name: true,
                        type: true,
                    }
                }
            }
        },
        members:{
            select:{
                id: true,
                username: true,
                avatar: true,
                status: true,
            }
        },
        createdAt: true,
        updatedAt: true
    }
}

export const MessageSelectObject = {
    select:{
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
        updatedAt: true,
        attachments:{
            select:{
                id: true,
                name: true,
                type: true,
            }
        }
    }
}