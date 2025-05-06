<script setup lang="tsx">
import { h, ref, onMounted } from "vue";

interface ExtractAttrsType {
  tag: string;
  attributes: Record<string, string>;
  children: ExtractAttrsType[];
}

const props = defineProps<{ data: string | undefined }>();
const parsedNodes = ref<ChildNode[]>([]);

const parseHtml = () => {
  if (import.meta.client && props.data) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(props.data, "text/html");
    parsedNodes.value = Array.from(doc.body.childNodes);
  }
};

const extractElementAttrs = (element: HTMLElement | Element) => {
  const standardAttributes = new Set([
    "id",
    "class",
    "title",
    "style",
    "src",
    "href",
    "alt",
    "name",
    "type",
    "value",
    "disabled",
    "readonly",
    "checked",
    "placeholder",
    "required",
    "maxlength",
    "minlength",
    "pattern",
    "autocomplete",
    "autofocus",
    "multiple",
    "step",
    "tabindex",
    "data-*",
    "role",
    "aria-*",
    "hidden",
    "draggable",
    "contenteditable",
    "spellcheck",
  ]);

  function extractAttributes(el: HTMLElement | Element): ExtractAttrsType {
    const attributes: Record<string, string> = {};
    for (let attr of el.attributes) {
      if (
        standardAttributes.has(attr.name) ||
        attr.name.startsWith("data-") ||
        attr.name.startsWith("aria-")
      ) {
        attributes[attr.name] = attr.value;
      }
    }
    return {
      tag: el.tagName.toLowerCase(),
      attributes,
      children: [...el.children].map(extractAttributes), // Recursively get child elements
    };
  }

  return extractAttributes(element);
};

const renderNode = (node: ChildNode): any => {
  if (node.nodeType === Node.TEXT_NODE) {
    // Just return the text content for text nodes
    return node.textContent;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement;
    const { attributes: props, tag: tagName } = extractElementAttrs(element);

    // Ensure we have a valid tag name
    if (!tagName || tagName.trim() === "") {
      console.warn("Invalid tag name detected:", tagName);
      return null;
    }

    if (
      tagName === "pre" &&
      element.firstElementChild?.tagName.toLowerCase() === "code"
    ) {
      const codeTag = element.firstElementChild;
      const { attributes: props } = extractElementAttrs(codeTag);

      let lang = props?.class.match(/language-([\w-]+)/)?.[1] || "plaintext";

      return h(
        "code",
        {
          style: {
            maxHeight: "80vh",
            padding: "0px",
          },
        },
        codeTag ? element.firstElementChild.textContent || "" : ""
      );
    }

    // Process child nodes, filtering out any that would result in invalid components
    const children = Array.from(element.childNodes)
      .map(renderNode)
      .filter((child) => child !== null);

    return h(tagName, props, children);
  }

  return null;
};

onMounted(parseHtml);
</script>

<template>
  <div class="prose w-full max-w-full">
    <h5 v-if="data && typeof data !== 'string'">
      Oops ,Sorry the data is not a string
    </h5>
    <template
      v-if="data && typeof data === 'string'"
      v-for="(node, index) in parsedNodes"
      :key="index"
    >
      <!-- Handle text nodes differently from element nodes -->
      <template v-if="node.nodeType === 3">
        {{ node.textContent }}
      </template>
      <component v-else :is="renderNode(node)" />
    </template>
  </div>
</template>
