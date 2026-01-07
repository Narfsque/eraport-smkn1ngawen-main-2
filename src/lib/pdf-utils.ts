import html2pdf from 'html2pdf.js';

const printStyles = `
  @page { size: A4 portrait; margin: 15mm; }
  @media print {
    html, body { width: 210mm; height: 297mm; margin: 0; }
    .raport-container { width: 210mm; }
  }
  html, body { height: 297mm; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #111827; }
  body { margin: 0; padding: 10mm; box-sizing: border-box; -webkit-print-color-adjust: exact; }
  .raport-container { width: 210mm; max-width: 100%; margin: 0 auto; }
  .raport-header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 8px; margin-bottom: 10px; }
  .raport-identity { width: 100%; display: flex; gap: 12px; margin: 8px 0 16px; }
  .identity-left, .identity-right { flex: 1; }
  .identity-table { width: 100%; border-collapse: collapse; border: 2px solid #000; }
  .identity-table td { padding: 6px 8px; vertical-align: top; border: 2px solid #000; }
  .scores-table { width: 100%; border-collapse: collapse; margin-top: 8px; border: 2px solid #000; }
  .scores-table th, .scores-table td { border: 2px solid #000; padding: 8px 10px; font-size: 12px; }
  .scores-table thead { display: table-header-group; }
  .scores-table tbody { display: table-row-group; }
  .scores-table tr { page-break-inside: avoid; }
  .scores-table th { background: #f3f4f6; font-weight: 700; }
  .no-break { page-break-inside: avoid; }
  .page-break { page-break-after: always; }
  .text-center { text-align: center; }
  .muted { color: #6b7280; }
  .sign-area { display:flex; gap:24px; justify-content:space-between; margin-top:24px; }
  .sign-block { width:30%; text-align:center; }
  .underline { border-bottom: 1px solid #111827; display:block; margin:36px 8px 8px 8px; }
`;

export const generatePDF = (element: HTMLElement, filename: string) => {
  // Build standalone HTML with inlined styles and open in new tab to trigger browser print
  try {
    const wrapper = document.createElement('div');
    wrapper.className = 'raport-container';
    const styleTag = document.createElement('style');
    styleTag.innerHTML = printStyles;
    wrapper.appendChild(styleTag);

    const clone = inlineStylesClone(element);
    clone.classList.add('raport-content');
    wrapper.appendChild(clone);

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title><meta name="viewport" content="width=device-width,initial-scale=1" /><style>${printStyles}</style></head><body>${wrapper.innerHTML}
      <script>
        // auto-print and do not close automatically to let user save PDF
        (function(){
          function doPrint(){ try{ window.print(); }catch(e){} }
          if (document.readyState === 'complete') setTimeout(doPrint, 500);
          else window.addEventListener('load', function(){ setTimeout(doPrint, 500); });
        })();
      </script>
    </body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    // revoke after a while
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) {
    console.error('generatePDF fallback error', e);
  }
};

export const printElement = (element: HTMLElement) => {
  try {
    const wrapper = document.createElement('div');
    wrapper.className = 'raport-container';
    const styleTag = document.createElement('style');
    styleTag.innerHTML = printStyles;
    wrapper.appendChild(styleTag);

    const clone = inlineStylesClone(element);
    clone.classList.add('raport-content');
    wrapper.appendChild(clone);

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Cetak Raport</title><meta name="viewport" content="width=device-width,initial-scale=1" /><style>${printStyles}</style></head><body>${wrapper.innerHTML}
      <script>
        (function(){
          function doPrint(){ try{ window.print(); }catch(e){ console.error(e); } }
          if (document.readyState === 'complete') setTimeout(doPrint, 500);
          else window.addEventListener('load', function(){ setTimeout(doPrint, 500); });
        })();
      </script>
    </body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) {
    console.error('printElement fallback error', e);
  }
};

// Debug helper: open the raport clone as a standalone HTML page in a new tab for inspection
export const exportDebugHTML = (element: HTMLElement) => {
  try {
    const wrapper = document.createElement('div');
    wrapper.className = 'raport-container';
    const styleTag = document.createElement('style');
    styleTag.innerHTML = printStyles;
    wrapper.appendChild(styleTag);

    const clone = inlineStylesClone(element);
    clone.classList.add('raport-content');
    wrapper.appendChild(clone);

    const html = '<!doctype html><html><head><meta charset="utf-8"><title>Debug Raport</title><style>' + printStyles + '</style></head><body>' + wrapper.innerHTML + '</body></html>';
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Revoke URL after a short time
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) {
    console.error('exportDebugHTML error', e);
  }
};

// Utility: deep-clone an element and copy computed styles as inline styles.
function inlineStylesClone(source: HTMLElement, targetDoc?: Document): HTMLElement {
  const doc = targetDoc || document;

  function cloneNodeWithStyles(node: Node): Node {
    if (node.nodeType === Node.TEXT_NODE) {
      return doc.createTextNode(node.textContent || '');
    }
    if (!(node instanceof HTMLElement)) {
      // for other node types, do a shallow clone
      return node.cloneNode(true);
    }

    const el = doc.createElement(node.tagName.toLowerCase());

    // copy attributes
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      try { el.setAttribute(attr.name, attr.value); } catch (e) { /* ignore */ }
    }

    // copy computed styles
    try {
      const computed = window.getComputedStyle(node);
      for (let i = 0; i < computed.length; i++) {
        const prop = computed.item(i);
        if (!prop) continue;
        const val = computed.getPropertyValue(prop);
        const pri = computed.getPropertyPriority(prop);
        try { el.style.setProperty(prop, val, pri); } catch (e) { /* ignore invalid props */ }
      }
    } catch (e) {
      // getComputedStyle may fail in some contexts; ignore
    }

    // recursively clone children
    for (let c = node.firstChild; c; c = c.nextSibling) {
      const childClone = cloneNodeWithStyles(c);
      if (childClone) el.appendChild(childClone);
    }

    return el;
  }

  return cloneNodeWithStyles(source) as HTMLElement;
}

// Wait until fonts are ready, images inside `root` are loaded, and DOM has been stable
async function waitForRender(root: HTMLElement, timeoutMs = 3000) {
  return new Promise<void>((resolve) => {
    let finished = false;
    const to = setTimeout(() => {
      if (!finished) { finished = true; resolve(); }
    }, timeoutMs);

    (async () => {
      try {
        if ((document as any).fonts && (document as any).fonts.ready) {
          await (document as any).fonts.ready;
        }
      } catch (e) {}

      const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[];
      const imgPromises = imgs.map(img => new Promise<void>((res) => {
        if (img.complete && img.naturalWidth !== 0) return res();
        const onDone = () => { img.removeEventListener('load', onDone); img.removeEventListener('error', onDone); res(); };
        img.addEventListener('load', onDone); img.addEventListener('error', onDone);
      }));

      try { await Promise.all(imgPromises); } catch (e) {}

      // wait for DOM stability (no mutations) for 150ms
      const observer = new MutationObserver(() => {
        if (stTimer) clearTimeout(stTimer);
        stTimer = setTimeout(finish, 150);
      });
      let stTimer: any = setTimeout(finish, 150);

      function finish() {
        observer.disconnect();
        if (!finished) {
          finished = true;
          clearTimeout(to);
          resolve();
        }
      }
      observer.observe(root, { childList: true, subtree: true, attributes: true });
    })();
  });
}

// Like waitForRender but works in the context of another window/document
async function waitForRenderInWindow(win: Window, rootEl: Element, timeoutMs = 3000) {
  return new Promise<void>((resolve) => {
    let finished = false;
    const to = setTimeout(() => {
      if (!finished) { finished = true; resolve(); }
    }, timeoutMs);
    (async () => {
      try {
        if ((win.document as any).fonts && (win.document as any).fonts.ready) {
          await (win.document as any).fonts.ready;
        }
      } catch (e) {}

      const imgs = Array.from((rootEl as Element).querySelectorAll('img')) as HTMLImageElement[];
      const imgPromises = imgs.map(img => new Promise<void>((res) => {
        if (img.complete && img.naturalWidth !== 0) return res();
        const onDone = () => { img.removeEventListener('load', onDone); img.removeEventListener('error', onDone); res(); };
        img.addEventListener('load', onDone); img.addEventListener('error', onDone);
      }));
      try { await Promise.all(imgPromises); } catch (e) {}
      if (!finished) { finished = true; clearTimeout(to); resolve(); }
    })();
  });
}
