import { Box } from "@strapi/design-system";
import { styled } from "styled-components";

import { Theme } from "../types";

export const EditorBox = styled(Box)<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spaces[3]};
  background: ${({ theme }) => theme.colors.neutral0};
  min-height: 150px;

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
  }

  .ProseMirror {
    outline: none;
    min-height: 120px;
  }
  
  .tiptap {
    --utrecht-button-padding-inline-start: 0 !important;
    --utrecht-button-padding-inline-end: 0 !important;
    --utrecht-button-margin-block-end: 0 !important;
    --utrecht-button-margin-block-start: 0 !important;
    --utrecht-button-margin-block-start: 0 !important;
    --utrecht-button-margin-inline-start: 0 !important;
    --utrecht-button-padding-block-start: 0 !important;
    --utrecht-button-min-block-size: 44px !important;
    --utrecht-button-min-inline-size: 44px !important;
  }

  .tiptap .details {
    display: flex;
    gap: ${({ theme }) => theme.spaces[3]};
    margin-block: ${({ theme }) => theme.spaces[4]};
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spaces[4]};
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
    align-items: baseline;
  }

  /* Summary text */
  .tiptap .details summary {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  /* Toggle button for collapse/expand */
  .tiptap .details > button {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes[0]};
    height: 1.5rem;
    justify-content: center;
    line-height: 1;
    margin-top: 0.25rem !important;
    padding: 0.25rem !important;
    width: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .tiptap .details > button:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }

  /* Toggle button icon */
  .tiptap .details > button:before {
    content: '▶';
    display: inline-block;
    transform: rotate(0deg);
    transition: transform 0.2s ease;
  }

  /* Rotate arrow when details is open */
  .tiptap .details.is-open > button:before {
    transform: rotate(90deg);
  }

  /* Content wrapper */
  .tiptap .details > div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spaces[4]};
    width: 100%;
  }

  /* Prevent large bottom gaps in content */
  .tiptap .details > div > [data-type='detailsContent'] > :last-child {
    margin-block-end: ${({ theme }) => theme.spaces[2]};
  }

  /* Styling for nested details */
  .tiptap .details .details {
    margin-block-start: ${({ theme }) => theme.spaces[3]};
    margin-block-end: ${({ theme }) => theme.spaces[3]};
    border-color: ${({ theme }) => theme.colors.neutral300};
  }
  .tiptap .is-empty::before {
    color: ${({ theme }) => theme.colors.neutral500};
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  .ProseMirror {
    outline: none;

    figure {
      inline-size: fit-content;
    }

    figcaption {
      border: 2px dashed ${({ theme }) => theme.colors.neutral300};
      padding-inline: ${({ theme }) => theme.spaces};
      padding-block: ${({ theme }) => theme.spaces[2]};
      padding-inline: ${({ theme }) => theme.spaces[2]};
      break-inside: avoid;
      color: var(--utrecht-table-caption-color);
      font-family: var(--utrecht-table-caption-font-family);
      font-size: var(--utrecht-table-caption-font-size);
      font-weight: var(--utrecht-table-caption-font-weight);
      line-height: var(--utrecht-table-caption-line-height);
      margin-block-end: var(--utrecht-table-caption-margin-block-end);
      page-break-after: avoid;
      text-align: var(--utrecht-table-caption-text-align, center);
    }

    p[data-lead='true'] {
      color: var(
        --utrecht-paragraph-lead-color,
        var(--utrecht-paragraph-color, var(--utrecht-document-color, inherit))
      );
      font-size: var(--utrecht-paragraph-lead-font-size, var(--utrecht-paragraph-font-size, inherit));
      font-weight: var(--utrecht-paragraph-lead-font-weight, var(--utrecht-paragraph-font-weight, inherit));
      line-height: var(--utrecht-paragraph-lead-line-height, var(--utrecht-paragraph-line-height, inherit));
    }

    .ProseMirror-selectednode {
      border: 5px solid ${({ theme }) => theme.colors.neutral800};
      box-sizing: border-box;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    table * p {
      --utrecht-space-around: 0;
    }
    figure,
    figcaption {
      inline-size: 100%;
    }
    td,
    th {
      --utrecht-table-header-cell-font-weight: var(--utrecht-table-header-font-weight);
      border: 1px solid ${({ theme }) => theme.colors.neutral100};
      min-inline-size: 3em;
    }

    th {
      border-block-end-color: var(--utrecht-table-header-border-block-end-color, transparent);
      border-block-end-style: solid;
      border-block-end-width: var(--utrecht-table-header-border-block-end-width, 0);
    }
  }
`;