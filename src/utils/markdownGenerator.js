/**
 * Generates the final Markdown blueprint from collected answers.
 */
export function generateMarkdown(answers, t) {
  // Fallback to English strings if t is not provided (should not happen in normal flow, but just in case)
  const safeT = t || ((key) => key.split('.').pop());

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
  md += `> **${safeT('markdown.purpose_title')}:** ${safeT('markdown.purpose_desc')}\n\n`;

  if (answers['q_purpose']) {
    md += `- **${safeT('markdown.blueprint_purpose')}:** ${fmt(answers['q_purpose'])}\n\n`;
  }

  if (answers['q_project_desc'] && answers['q_project_desc'].value) {
    md += `## 💡 ${safeT('markdown.project_desc') || 'Project Description'}\n`;
    md += `${answers['q_project_desc'].value}\n\n`;
  }

  md += `## 📋 1. ${safeT('markdown.project_overview')}\n`;
  md += `- **${safeT('markdown.project_type')}:** ${fmt(answers['q_project_type'])}\n`;
  if (isBusiness) {
    md += `- **${safeT('markdown.industry')}:** ${fmt(answers['q_long_industry'])}\n`;
    if (answers['q_long_tech_spec']) md += `- **${safeT('markdown.tech_spec')}:** ${fmt(answers['q_long_tech_spec'])}\n`;
    if (answers['q_long_otop_spec']) md += `- **${safeT('markdown.product_type')}:** ${fmt(answers['q_long_otop_spec'])}\n`;
    if (answers['q_long_retail_spec']) md += `- **${safeT('markdown.sales_channel')}:** ${fmt(answers['q_long_retail_spec'])}\n`;
  } else {
    md += `- **${safeT('markdown.campaign_category')}:** ${fmt(answers['q_short_category'])}\n`;
  }
  md += `\n`;

  md += `## 🧩 2. ${canvasName}\n`;

  if (isBusiness) {
    md += `### ${safeT('markdown.desirability')}\n`;
    md += `**${safeT('markdown.customer_segments')}:**\n${fmtList(answers['q_long_target'])}`;
    md += `**${safeT('markdown.value_propositions')}:**\n${fmtList(answers['q_long_value'])}`;

    md += `### ${safeT('markdown.feasibility')}\n`;
    md += `**${safeT('markdown.key_activities')}:**\n${fmtList(answers['q_long_activities'])}`;
    md += `**${safeT('markdown.revenue_streams')}:**\n${fmtList(answers['q_long_revenue'])}`;
    md += `\n`;
  } else {
    md += `### ${safeT('markdown.impact')}\n`;
    md += `**${safeT('markdown.beneficiaries')}:**\n${fmtList(answers['q_short_target'])}`;
    md += `**${safeT('markdown.objective')}:**\n${fmtList(answers['q_short_objective'])}`;
    md += `**${safeT('markdown.deployment_channels')}:**\n${fmtList(answers['q_short_channels'])}`;

    md += `### 🎯 3. OKRs (Objectives and Key Results)\n`;
    md += `**${safeT('markdown.key_results')}:**\n${fmtList(answers['q_short_metric'])}`;
    md += `\n`;
  }

  md += `## ✍️ ${isBusiness ? '3' : '4'}. ${safeT('markdown.persona')}\n`;
  md += `- **${safeT('markdown.platform')}:** ${fmt(answers['q_platform'])}\n`;
  md += `> **${safeT('markdown.instruction_title')}:** ${safeT('markdown.instruction_desc')}\n\n`;
  md += `### ${safeT('markdown.sample_content')}:\n`;
  md += `\`\`\`text\n${answers['q_sample_text']?.value || safeT('markdown.no_sample')}\n\`\`\`\n`;

  return md;
}

/**
 * Download generated Markdown as a file.
 */
export function downloadMarkdown(answers, t) {
  const mdContent = generateMarkdown(answers, t);
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
