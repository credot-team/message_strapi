# Message Server

- domain

```
https://message.credot-web.com
```

## 發送簡訊

- url: /api/messages
- method: post
- secret: 每個服務都會有自己的 secret,做 checksum 使用
- body
  ```json
  {
    "data" : {
        "phone":"09123456789",
        "content":"111",
        "service":"peman",
        "timestamp":"1640852020",
        "checksum": "${service}${phone}${content}${timestamp}${secret}"
    }
  }
  ```

## 取得發送歷程

- url: /api/messages

- method: get

- query params
  
   |            欄位名稱            |                             說明                             | 預設 |
   | :----------------------------: | :----------------------------------------------------------: | :--: |
   | filters\[service]\[name]\[$eq] |                           服務名稱                           |      |
   |           timestamp            |                       十位數timestamp                        |      |
   |            Checksum            |     驗證用: sha256(${service}${timestamp}${temp.secret})     |      |
   |        pagination[page]        |                      page number, 選填                       |  1   |
   |      pagination[pageSize]      |                       page size, 選填                        |  25  |
   |   filters\[createdAt]\[條件]   | [參考](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html), 選填 |      |

