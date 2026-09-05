# 在校生保護者 かんたん受付

文化祭の在校生保護者向けセルフ受付アプリです。

## 受付フロー
1. 学年を選ぶ
2. クラスを選ぶ
3. 名字の五十音頭文字を選ぶ
4. 生徒名を選ぶ
5. 保護者人数を選ぶ
6. 同行者人数を選ぶ
7. 受付完了

## 人数定義
- 保護者：父母
- 同行者：祖父母・きょうだい・その他

## 名簿の扱い
実名簿はGitHubリポジトリへ保存しません。受付端末で受付用CSVを1回読み込み、ブラウザのlocalStorageに保存します。

受付用CSVの列：
`grade,class,number,surname,surnameKana,name,kana`

## 受付記録
受付状況画面で、受付件数・保護者数・同行者数・合計人数を確認できます。受付記録はCSVとして書き出せます。

## 注意
名簿・受付記録は端末内保存です。ブラウザのサイトデータを削除すると消える可能性があるため、運用後は受付記録CSVを保存してください。

## 公開
GitHub Pages公開起点は `index.html` です。
公開URL： https://branzfamily01.github.io/guardian-tap-checkin/
マニュアル： https://branzfamily01.github.io/guardian-tap-checkin/manual.html
