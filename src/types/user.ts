interface ISessionUser {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
    avatar: string;
    steamId: string;
    accountType: string;
    balance:{
      id:number;
      amount:number;
    },
    roles:[{
      id: number;
      name: string;
    }]
  };
}