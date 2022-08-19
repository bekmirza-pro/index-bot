import { OnModuleInit, Injectable } from '@nestjs/common';

@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit() {
    this.botMessage();
  }

  botMessage() {
    const TelegramBot = require('node-telegram-bot-api');

    process.env.NTBA_FIX_319 = "1";

    const token = process.env.BOT_TOKEN;

    const bot = new TelegramBot(token, { polling: true });

    bot.on('polling_error', (msg) => console.log(msg));

    bot.onText(/\/start/, (msg) => {
      const receiver = msg.chat.id;

      bot.sendMessage(
        receiver,
        `Assalomu aleykum asasasas ${msg.from.first_name},  Intex-market ning rasmiy telegram botiga xush kelibsiz !!`,
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: '👨‍💻 Sign in',
                },
              ],
              [
                {
                  text: '📞 Aloqa',
                },
              ],
            ],
            resize_keyboard: true,
          },
        },
      );
    });

    bot.on('message', (msg) => {
      const receiver = msg.chat.id;

      if (msg.text === '👨‍💻 Sign in') {
        bot.sendMessage(
          receiver,
          '✅ Bot dan to`liq foydalanish uchun namunada ko`rsatilgandek login qiling:\n  \n ➡️ username: Jhon \n ➡️ login: 123abc ',
          {},
        );

        bot
          .sendMessage(receiver, 'username: kiriting', {
            reply_markup: {
              force_reply: true,
            },
          })
          .then((payload) => {
            const replyListenerId = bot.onReplyToMessage(
              payload.chat.id,
              payload.message_id,
              (msg) => {
                let username = msg.text;
                console.log(username);

                bot
                  .sendMessage(receiver, 'login: kiriting', {
                    reply_markup: {
                      force_reply: true,
                    },
                  })
                  .then((payload) => {
                    const replyListenerId = bot.onReplyToMessage(
                      payload.chat.id,
                      payload.message_id,
                      (msg) => {
                        let login = msg.text;
                        console.log(login);
                      },
                    );
                  });
              },
            );
          });
      }

      // if (msg.text === '⬅️  Orqaga') {

      //     bot.sendMessage(receiver, '✅ Asosiy menyuga qaytdingiz !!!', {
      //         reply_markup: {
      //             keyboard: [
      //               [
      //                 {
      //                   text: '👨‍💻 Sign in',
      //                 }
      //               ],
      //               [
      //                 {
      //                   text: '📞 Aloqa',
      //                 },
      //               ],
      //             ],
      //             resize_keyboard: true,
      //           },
      //     })
      // }
    });
  }
}
