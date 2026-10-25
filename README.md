# 鐘聲之後｜教師工作的另一面

以教室為展場的響應式數位策展，從 TALIS 2018 台灣國中教師資料，帶觀眾看見工作滿意、工作壓力與校內支持等不同面向。

## 本機開發

- 使用 Node.js 22.12 或更新版本及 pnpm 11.25。
- 執行 `pnpm install` 安裝相依套件。
- 執行 `pnpm dev` 啟動 Vite 開發伺服器。
- 執行 `pnpm build` 建置網站至 dist。
- 執行 `pnpm preview` 預覽建置結果。

網站以 GSAP 和 ScrollTrigger 呈現漸進式展場轉場；瀏覽器設定減少動態效果時，動畫會停用，內容仍可正常閱讀與操作。

## 資料與策展說明

展覽以 OECD TALIS 2018 台灣樣本為主要線索。國家報告中的教師樣本為國中教師，調查年份為 2018。報告數字描述群體比例；除報告明確說明的關聯外，不代表因果或個人經驗。

整體工作滿意度作為教師工作感受的替代線索，不等同於「成就感」。展覽另標示樣本與年份，並將近期教育部統計作為不同年份的現況脈絡呈現，不把兩者直接配對推論。

資料來源：

- [OECD TALIS 2018 台灣國家報告](https://www.oecd.org/content/dam/oecd/en/about/programmes/edu/talis/talis2018participantnotes/volii/TALIS2018_CN_TWN_Vol_II.pdf)
- [OECD TALIS 2018 資料庫與問卷](https://www.oecd.org/en/data/datasets/talis-2018-database.html)
- [教育部 114 學年度國民中小學校概況統計](https://stats.moe.gov.tw/bookcase/Basic/115/index.html)
- [聯合國 SDG 8](https://sdgs.un.org/goals/goal8)
- [聯合國 SDG 4](https://sdgs.un.org/goals/goal4)

TALIS 數據仍需以 OECD 公開微觀資料完成個人層級的交叉分析；網站目前呈現的是 OECD 已發布的彙整結果。

## 觀展回饋與 Google Apps Script

回饋表單只收集觀眾入場時選擇的印象、離場時的一句反思與同意送出的狀態。表單不要求姓名、學校或聯絡方式。資料透過公開的 Apps Script 網頁應用程式網址送出；該網址會出現在瀏覽器端，請勿放入憑證或私密金鑰。

目前尚未設定回饋網址，表單送出功能會保持停用。使用者在瀏覽器中建立並部署 Apps Script 網頁應用程式後：

1. 在本機複製 `.env.example` 為 `.env`，填入 `VITE_FEEDBACK_ENDPOINT`。
2. 在 GitHub 專案的 Settings → Secrets and variables → Actions → Variables 建立同名的 Repository variable，填入 Apps Script 部署網址。此網址是公開設定值，不是 Secret。
3. 讓 GitHub Actions 重新建置網站。Apps Script 端仍須驗證欄位、字數與同意狀態，並只寫入已核准的回饋欄位。

瀏覽器以 no-cors 模式送出表單，因此網站無法讀取 Apps Script 的 HTTP 回應來確認試算表是否完成寫入；送出後需在試算表確認紀錄。

## GitHub Pages

GitHub Actions workflow 會在推送至 main 分支或手動派送時建置並部署至 GitHub Pages。

GitHub Pages 網址：[https://leeshuogre.github.io/digital-curation/](https://leeshuogre.github.io/digital-curation/)
