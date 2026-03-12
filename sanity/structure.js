export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('News Articles')
        .child(S.documentTypeList('article').title('News Articles')),
      S.listItem()
        .title('Videos')
        .child(S.documentTypeList('video').title('Videos')),
      S.listItem()
        .title('Magazines')
        .child(S.documentTypeList('magazine').title('Magazines')),
      S.listItem()
        .title('Match Reports')
        .child(S.documentTypeList('matchReport').title('Match Reports')),
      S.listItem()
        .title('Home Page Settings')
        .child(S.document().schemaType('homeSettings').documentId('homeSettings')),
    ])