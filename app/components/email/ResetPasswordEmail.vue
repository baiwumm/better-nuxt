<script setup lang="ts">
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@vue-email/components'

withDefaults(defineProps<{
  url: string
  email: string
  appName?: string
  expirationMinutes?: number
}>(), {
  appName: 'Better Nuxt',
  expirationMinutes: 5,
})
</script>

<template>
  <Html lang="zh-CN">
    <Head />
    <Preview> {{ appName }}  </Preview>
    <Body style=" margin:0; padding:40px 0; background:#f5f5f5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; ">
      <Container style=" max-width:560px; margin:0 auto; background:#ffffff; border-radius:16px; padding:20px; box-sizing:border-box; ">
        <Section style="text-align:center;">
          <!-- Logo -->
          <Img
            src="https://nuxt.baiwumm.com/logo.png"
            width="48"
            height="48"
            :alt="appName"
            style="margin:0 auto;"
          />

          <Heading style=" font-size:24px; line-height:32px; font-weight:700; color:#111827; ">
            重置您的密码 - {{ appName }}
          </Heading>

          <Text style=" font-size:14px; line-height:28px; color:#737373; margin:0 0 32px; ">
            我们收到了一条请求，要求重置您 {{ appName }} 账户（用户邮箱为
            <Link :href="`mailto:${email}`" class="color:#2563eb;">
              {{ email }}
            </Link>
            ）的密码。
          </Text>

          <Section style="margin-bottom:32px;">
            <Button :href="url" style=" background:#111827; color:#ffffff; padding:14px 24px; border-radius:10px; text-decoration:none; font-size:15px; font-weight:600; display:inline-block; ">
              重置密码
            </Button>
          </Section>

          <Text style=" font-size:12px; line-height:24px; color:#737373; margin-bottom:12px; ">
            如果按钮无法点击，请复制下面链接到浏览器：
          </Text>

          <Link :href="url" style=" font-size:12px; line-height:24px; color:#2563eb; word-break:break-all; ">
            {{ url }}
          </Link>

          <Hr style=" margin:24px 0; border:none; border-top:1px solid #E5E5E5; " />

          <Text style=" font-size:12px; line-height:24px; color:#737373;">
            此链接将在 {{ expirationMinutes }} 分钟后过期。该邮件由 {{ appName }} 发送。
          </Text>

          <Text style=" font-size:12px; line-height:24px; color:#737373; ">
            如果不是你本人操作，请忽略此邮件。
          </Text>

          <Text style=" font-size:12px; color:#9ca3af; ">
            Powered by <Link href="https://better-auth.com" style="color:#2563eb;">
              {{ appName }}
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
</template>
