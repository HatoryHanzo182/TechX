import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Список провайдеров аутентификации
  providers: [
    // Конфигурация провайдера Google
    GoogleProvider({  
      clientId: process.env.GOOGLE_CLIENT_ID,  // Идентификатор клиента, полученный из Google Console (в тг кину env файл)
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Секрет клиента, полученный из Google Console
    }),
  ],
  secret: process.env.SECRET, // Секрет, используемый для шифрования токенов сессии 

  // Коллбеки для управления процессом аутентификации и сессии
  callbacks: {
    // Вызывается при попытке входа
    async signIn({user, account, profile, email, credentials}) 
    {
      console.log("signIn", user, account, profile, email, credentials);
      return { user, account, profile, email, credentials };
    },

    // Вызывается при создании сессии
    async session({session, token, user}) {
      console.log("session", session, token, user);
      session.user = user; // Добавляем информацию о пользователе в объект сессии
      return session;
    },

    // Вызывается после успешного входа для перенаправления пользователя
    async redirect({url, baseUrl}) {
      console.log("redirect", url, baseUrl);
      return baseUrl;  // Перенаправляет пользователя на базовый url
    },
  },

  // Определение функции сессии на уровне верхних опций
  async session(session, user) {
    session.user = user; // Повторное добавление информации о пользователе в объект сессии
    return session;
  }
};

// Создаем обработчик для аутентификации, используя опции, определенные выше
const handler = NextAuth(authOptions);

// Экспорт обработчика для методов GET и POST, необходимых для работы NextAuth
export { handler as GET , handler as POST }
