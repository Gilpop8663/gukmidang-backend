import fetch from 'node-fetch';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVariant, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVariant[],
  ) {
    try {
      const form = new FormData();
      form.append('from', `국미당 <gukmidang@${this.options.domain}>`);
      form.append('to', `wolfye0611@gmail.com`);
      form.append('template', template);
      form.append('subject', subject);

      emailVars.forEach((item) => {
        form.append(`v:${item.key}`, item.value);
      });

      await fetch(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('[국미당] 이메일 인증을 해주세요', 'verify-email', [
      { key: 'username', value: email },
      { key: 'code', value: code },
    ]);

    console.log('이메일 보내짐');
  }
}
