# horizontal-video-pack 使用说明

用途：制作 16:9 横屏 AI 科普视频，主题为 codex-cost-router 如何帮 Codex 执行前省 token、控风险。

## 1. 先录真实屏幕
1. GPT 对话框：录模糊大任务、长上下文、输入框特写。
2. Codex 实操：录调用 codex-cost-router、预检报告、最终优化 Prompt。
3. Skill 文件夹：录 `SKILL.md`、`README.md`、`references/`。
4. 文档特写：录 Purpose、Core Principle、Key Output。

## 2. 再录 HTML 插片
打开 `overlays/` 下 6 个 HTML 文件，全屏浏览器录屏：
- `intro-title.html`
- `token-waste-flow.html`
- `cost-router-flow.html`
- `model-decision-card.html`
- `before-after.html`
- `ending-card.html`

## 3. 导入剪映
1. 新建 16:9 项目。
2. 导入所有录屏素材。
3. 按 `04-capcut-timeline.md` 排时间轴。
4. 主体用真实录屏，HTML 插片只做解释和转场。

## 4. 导入字幕
1. 在剪映中选择“导入字幕”。
2. 导入 `05-subtitles.srt`。
3. 字幕样式建议：白字、黑描边、底部安全区。

## 5. 成片组合
1. 先放开场标题。
2. 接 GPT 问题场景。
3. 用流程插片解释 token 浪费。
4. 切 Skill 文件和 Codex 实操。
5. 用模型决策和前后对比收束。
6. 结尾保留“先路由，再执行”2 秒以上。
