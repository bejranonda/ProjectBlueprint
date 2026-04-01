/**
 * Generates the final Markdown blueprint from collected answers.
 */
export function generateMarkdown(answers) {
  const isBusiness = answers['q_project_type']?.value === 'long-term';
  const canvasName = isBusiness ? 'Business Model Canvas (BMC)' : 'Mission Model Canvas (MMC)';

  const fmt = (ans) => {
    if (!ans || !ans.label) return 'N/A';
    if (Array.isArray(ans.label)) return ans.label.join(', ');
    return ans.label;
  };

  const fmtList = (ans) => {
    if (!ans || !ans.label || ans.label.length === 0) return '- N/A\n';
    if (Array.isArray(ans.label)) return ans.label.map((l) => `- ${l}`).join('\n') + '\n';
    return `- ${ans.label}\n`;
  };

  let md = `# 🚀 AI Project Blueprint\n\n`;
  md += `> **Purpose:** Master Context for AI Vibe-Coding and Project Generation.\n\n`;

  md += `## 📋 1. Project Overview\n`;
  md += `- **Project Type:** ${fmt(answers['q_project_type'])}\n`;
  if (isBusiness) {
    md += `- **Industry / Sector:** ${fmt(answers['q_long_industry'])}\n`;
    if (answers['q_long_tech_spec']) md += `- **Tech Specification:** ${fmt(answers['q_long_tech_spec'])}\n`;
    if (answers['q_long_otop_spec']) md += `- **Product Type:** ${fmt(answers['q_long_otop_spec'])}\n`;
    if (answers['q_long_retail_spec']) md += `- **Sales Channel:** ${fmt(answers['q_long_retail_spec'])}\n`;
  } else {
    md += `- **Campaign Category:** ${fmt(answers['q_short_category'])}\n`;
  }
  md += `\n`;

  md += `## 🧩 2. ${canvasName}\n`;

  if (isBusiness) {
    md += `### Desirability (การตอบโจทย์ลูกค้า)\n`;
    md += `**Customer Segments (กลุ่มเป้าหมาย):**\n${fmtList(answers['q_long_target'])}`;
    md += `**Value Propositions (จุดเด่น):**\n${fmtList(answers['q_long_value'])}`;

    md += `### Feasibility & Viability (การดำเนินงานและรายได้)\n`;
    md += `**Key Activities (กิจกรรมหลัก):**\n${fmtList(answers['q_long_activities'])}`;
    md += `**Revenue Streams (โมเดลรายได้):**\n${fmtList(answers['q_long_revenue'])}`;
    md += `\n`;
  } else {
    md += `### Impact & Beneficiaries (ผลกระทบและผู้ได้รับประโยชน์)\n`;
    md += `**Beneficiaries (กลุ่มเป้าหมาย/ผู้รับประโยชน์):**\n${fmtList(answers['q_short_target'])}`;
    md += `**Objective (เป้าหมายสูงสุด):**\n${fmtList(answers['q_short_objective'])}`;
    md += `**Deployment Channels (ช่องทางการสื่อสาร):**\n${fmtList(answers['q_short_channels'])}`;

    md += `### 🎯 3. OKRs (Objectives and Key Results)\n`;
    md += `**Key Results (ตัวชี้วัดความสำเร็จ):**\n${fmtList(answers['q_short_metric'])}`;
    md += `\n`;
  }

  md += `## ✍️ ${isBusiness ? '3' : '4'}. AI Persona & Context\n`;
  md += `- **Target Publishing Platform:** ${fmt(answers['q_platform'])}\n`;
  md += `> **Instruction for AI:** Analyze the following sample text. When generating future content, marketing copy, or code for this project, heavily adapt to this tone, style, and structure suited for the platform.\n\n`;
  md += `### Sample Content / Code Style:\n`;
  md += `\`\`\`text\n${answers['q_sample_text']?.value || 'No sample provided.'}\n\`\`\`\n`;

  return md;
}

/**
 * Download generated Markdown as a file.
 */
export function downloadMarkdown(answers) {
  const mdContent = generateMarkdown(answers);
  const blob = new Blob([mdContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Project_Blueprint.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
