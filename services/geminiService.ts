import { GoogleGenAI } from "@google/genai";

const EXAMPLE_REPORT = `

## 1️⃣ 캠페인 유형별 성과 요약

| 캠페인유형 | 총비용(원) | ROAS | 노출수 | 클릭수 | CTR | CPC(원) | 전환수 | CVR | 전환매출(원) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **쇼핑검색** | 243,716 | **277%** | 72,627 | 433 | **0.60%** | **563원** | 18 | **4.16%** | 675,000 |
| **파워링크** | 17,083 | 211% | 20,045 | 87 | 0.43% | 196원 | 1 | 1.15% | 36,000 |

**요약 인사이트**

- 전체 전환매출은 **쇼핑검색이 주도(ROAS 277%)**,
    
    클릭비용이 저렴한 파워링크는 **보조 유입원**으로 활용 적합.
    
- 쇼핑검색의 **CPC 대비 전환율이 양호**하여 ROAS 200% 이상 안정적 운영 가능.
- 신규 테스트 캠페인 쇼핑검색 확장은 효율 자체가 저조하여 점진적으로 키워드 축소하며 고도화 예정

---

## 2️⃣ 기기별 / 채널별 성과

### 💻 기기별

| 매체 | 총비용(원) | ROAS | 노출수 | 클릭수 | CTR | CPC(원) | 전환수 | CVR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **PC** | 14,260 | 0% | 10,434 | 23 | 0.22% | 620 | 0 | 0% |
| **모바일** | 283,050 | **269%** | 92,312 | 555 | **0.60%** | **510** | 21 | **3.78%** |

📍 **인사이트:**

- 모바일이 **대부분의 유입(CTR 0.6%)과 전환(21건)**을 견인.
- PC는 클릭 대비 전환 0건 → **랜딩페이지 모바일 중심 최적화** 적합.

---

### 🔍 채널별

| 매체 | 총비용(원) | ROAS | 노출수 | 클릭수 | CTR | CPC(원) | 전환수 | CVR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **검색** | 290,850 | **256%** | 76,028 | 554 | **0.73%** | 525 | 20 | 3.61% |
| **콘텐츠** | 6,672 | 233% | 26,718 | 24 | 0.09% | 278 | 1 | 4.17% |

📍 **인사이트:**

- 검색매체가 **성과 중심**, 콘텐츠는 **보조 테스트용 매체**로 유지.
- 콘텐츠 클릭률은 낮지만 CVR이 높아, 향후 **낮은 입찰가 노출 유지 전략** 가능.

---

## 3️⃣ 키워드 성과 분석

### 💰 비용 상위 10개

| 키워드 | 총비용(원) | ROAS | 노출수 | 클릭수 | 클릭률 | CPC | 전환수 | CVR | 전환매출 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \`확장검색\` | 211,197 | **29%** | 42,952 | 339 | 0.79% | 623 | 3 | 0.88% | 62,500 |
| \`쇼핑 확장 검색\` | 66,495 | **945%** | 38,202 | 143 | 0.38% | 465 | 16 | **11.19%** | 628,000 |
| 복숭아즙 | 11,550 | **312%** | 3,472 | 30 | 0.87% | 385 | 1 | 3.33% | 36,000 |
| \`콘텐츠\` | 4,880 | **718%** | 515 | 20 | **3.89%** | 244 | 1 | 5.00% | 35,000 |
| 과채주스 | 2,926 | 0% | 14,428 | 38 | 0.27% | 77 | 0 | 0% | 0 |
| 과일즙 | 308 | 0% | 1,522 | 4 | 0.27% | 77 | 0 | 0% | 0 |
| 복숭아즙효능 | 154 | 0% | 192 | 2 | 1.05% | 77 | 0 | 0% | 0 |
| 복숭아생즙 | 132 | 0% | 3 | 1 | 33.3% | 132 | 0 | 0% | 0 |
| 시골내음 | 77 | 0% | 378 | 1 | 0.27% | 77 | 0 | 0% | 0 |

📍 **고ROAS 키워드**

- \`복숭아즙\` (ROAS 312%)
- \`쇼핑 확장 검색\`(ROAS 945%, CVR 11%)
- \`콘텐츠\` 노출 (ROAS 718%)

📍 **무전환 / 저성과 키워드**

- 과채주스 / 과일즙 / 복숭아즙효능 / 복숭아생즙 / 시골내음
    
    → **ROAS 0%, 전환 0건**으로 예산 낭비 구간 확인됨.
    

---

## 4️⃣ 개선 제안

### ✅ ① 저성과 키워드 정리

- **과채주스 / 과일즙 / 복숭아즙효능 / 복숭아생즙 / 시골내음**
    
    → 전환 0, ROAS 0 → **입찰가 50%↓ 또는 제외**
    

### ✅ ② 고ROAS 키워드 확장

- \`복숭아즙\`, \`복숭아즙 선물\`, \`복숭아즙 효능\` 등의 **롱테일 조합 확장**
- 312% 이상 ROAS 확보 키워드는 **유사 검색어 확장/소재 분리 테스트**

### ✅ ③ 모바일 집중 운영

- 전환의 95% 이상이 **모바일 기기**에서 발생
    
    → **모바일 전용 랜딩페이지 강화 + CTA 버튼 시각적 강조**
    

---

`;

export const generateReport = async (deviceData: string, weeklyData: string, keywordData: string): Promise<string> => {
    
    // FIX: Per coding guidelines, the API key must be obtained exclusively from `process.env.API_KEY`.
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
You are an expert digital marketing analyst with deep knowledge of Naver's advertising platform. Your task is to analyze three provided CSV files containing advertising data for a client and generate a comprehensive, insightful performance report in Korean, formatted as Markdown.

Follow the exact structure, tone, and analysis style of the example report provided below.

**EXAMPLE REPORT:**
${EXAMPLE_REPORT}
---

Now, analyze the following three new CSV datasets for a different client.

**INSTRUCTIONS:**
1. Generate a report in Korean.
2. Use Markdown for all formatting (headers, tables, bold text, lists, emojis).
3. Derive key insights from the data for each section.
4. Provide concrete, actionable "개선 제안" (Improvement Suggestions) based on your analysis.
5. Calculate key metrics like CTR (클릭률), CPC (평균클릭비용), CVR (전환율), Spend(총비용) and ROAS (광고수익률) where necessary, using the data provided. The column names are in Korean, so interpret them correctly (e.g., '총비용(VAT포함,원)' is total cost, '전환매출액(원)' is conversion revenue). All data tables must include '총비용(원)' and 'ROAS', and these two columns should be the first metric columns shown.
6. The client's name seems to be 'honestcanin' from the first line of the CSV. Refer to the client appropriately if needed.

---
**DATASET 1: PC/Mobile and Search/Content Data**
\`\`\`csv
${deviceData}
\`\`\`
---
**DATASET 2: Weekly Data**
\`\`\`csv
${weeklyData}
\`\`\`
---
**DATASET 3: Keyword Data**
\`\`\`csv
${keywordData}
\`\`\`
---

Generate the full Markdown report based on the data above. Begin with a greeting and introduction.
`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating report from Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};