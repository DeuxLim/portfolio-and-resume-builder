import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Components } from "react-markdown";
import type { Schema } from "hast-util-sanitize";

const markdownComponents: Components = {
	a: ({ node: _node, ...props }) => (
		<a {...props} target="_blank" rel="noreferrer noopener" />
	),
};

const readAttributes = (schema: Schema, key: string) =>
	(schema.attributes?.[key] ?? []) as NonNullable<Schema["attributes"]>[string];

const htmlSanitizeSchema: Schema = {
	...defaultSchema,
	tagNames: [...(defaultSchema.tagNames ?? []), "style", "section", "div", "span"],
	attributes: {
		...defaultSchema.attributes,
		"*": [...readAttributes(defaultSchema, "*"), "className", "id"],
		section: [...readAttributes(defaultSchema, "section"), "className", "id"],
		div: [...readAttributes(defaultSchema, "div"), "className", "id"],
		span: [...readAttributes(defaultSchema, "span"), "className", "id"],
	},
};

export default function MarkdownContent({
	content,
	className,
}: {
	content: string;
	className?: string;
}) {
	const normalizedContent = content
		.trim()
		.replace(/^```(?:html)?\s*\n?/i, "")
		.replace(/\n?```$/, "");

	return (
		<div className={["markdown-render", className].filter(Boolean).join(" ")}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, [rehypeSanitize, htmlSanitizeSchema]]}
				components={markdownComponents}
			>
				{normalizedContent}
			</ReactMarkdown>
		</div>
	);
}
