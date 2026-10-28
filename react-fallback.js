/**
 * Offline & Zero-Dependency Micro-React Fallback
 * Activates automatically only if official React CDN is blocked or unavailable offline.
 */
(function() {
  if (window.React && window.ReactDOM) return; // Official React is loaded!

  console.log('Activating Built-in Standalone Offline Engine');

  let currentComponent = null;
  let hookIndex = 0;

  const React = {
    createElement(type, props, ...children) {
      const flattenedChildren = children.flat(Infinity).filter(c => c !== null && c !== undefined && c !== false);
      return {
        type,
        props: {
          ...(props || {}),
          children: flattenedChildren
        }
      };
    },

    useState(initialValue) {
      const comp = currentComponent;
      const index = hookIndex++;
      
      if (!comp._hooks[index]) {
        comp._hooks[index] = typeof initialValue === 'function' ? initialValue() : initialValue;
      }

      const setState = (newValue) => {
        const next = typeof newValue === 'function' ? newValue(comp._hooks[index]) : newValue;
        if (comp._hooks[index] !== next) {
          comp._hooks[index] = next;
          comp._scheduleUpdate();
        }
      };

      return [comp._hooks[index], setState];
    },

    useEffect(callback, deps) {
      const comp = currentComponent;
      const index = hookIndex++;
      const oldHook = comp._hooks[index];
      
      const hasChanged = !oldHook || !deps || deps.some((dep, i) => dep !== oldHook.deps[i]);

      if (hasChanged) {
        if (oldHook && typeof oldHook.cleanup === 'function') {
          try { oldHook.cleanup(); } catch (e) { console.error(e); }
        }
        setTimeout(() => {
          const cleanup = callback();
          comp._hooks[index] = { deps, cleanup };
        }, 0);
      }
    },

    useRef(initialValue) {
      const comp = currentComponent;
      const index = hookIndex++;
      if (!comp._hooks[index]) {
        comp._hooks[index] = { current: initialValue };
      }
      return comp._hooks[index];
    },

    useMemo(factory, deps) {
      const comp = currentComponent;
      const index = hookIndex++;
      const oldHook = comp._hooks[index];
      const hasChanged = !oldHook || !deps || deps.some((dep, i) => dep !== oldHook.deps[i]);
      if (hasChanged) {
        comp._hooks[index] = { value: factory(), deps };
      }
      return comp._hooks[index].value;
    },

    useCallback(callback, deps) {
      return React.useMemo(() => callback, deps);
    }
  };

  function renderVNode(vnode) {
    if (vnode === null || vnode === undefined || vnode === false) {
      return document.createTextNode('');
    }
    if (typeof vnode === 'string' || typeof vnode === 'number') {
      return document.createTextNode(String(vnode));
    }

    if (typeof vnode.type === 'function') {
      const comp = {
        _hooks: [],
        _vnode: vnode,
        _dom: null,
        _scheduleUpdate() {
          if (this._updateScheduled) return;
          this._updateScheduled = true;
          requestAnimationFrame(() => {
            this._updateScheduled = false;

            // Preserve active input focus & selection
            const activeEl = document.activeElement;
            let focusSelector = null;
            let selStart = 0;
            let selEnd = 0;
            if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
              if (activeEl.placeholder) {
                focusSelector = `[placeholder="${activeEl.placeholder}"]`;
              } else if (activeEl.className) {
                focusSelector = `.${activeEl.className.split(' ')[0]}`;
              }
              selStart = activeEl.selectionStart;
              selEnd = activeEl.selectionEnd;
            }

            currentComponent = this;
            hookIndex = 0;
            const newVNode = this._vnode.type(this._vnode.props);
            currentComponent = null;
            const newDom = renderVNode(newVNode);
            if (this._dom && this._dom.parentNode) {
              this._dom.parentNode.replaceChild(newDom, this._dom);
              this._dom = newDom;

              // Restore focus & selection
              if (focusSelector) {
                const newFocusEl = this._dom.querySelector ? this._dom.querySelector(focusSelector) : null;
                if (newFocusEl) {
                  newFocusEl.focus();
                  if (newFocusEl.setSelectionRange && typeof selStart === 'number') {
                    newFocusEl.setSelectionRange(selStart, selEnd);
                  }
                }
              }
            }
          });
        }
      };

      currentComponent = comp;
      hookIndex = 0;
      const rendered = vnode.type(vnode.props);
      currentComponent = null;
      comp._dom = renderVNode(rendered);
      return comp._dom;
    }

    // Standard DOM node or SVG
    const isSvg = vnode.type === 'svg' || ['path', 'circle', 'rect', 'line', 'polygon', 'title'].includes(vnode.type);
    const dom = isSvg 
      ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type)
      : document.createElement(vnode.type);

    const { children, ...props } = vnode.props || {};

    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        dom.setAttribute('class', value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.entries(value).forEach(([sKey, sVal]) => {
          if (sKey.startsWith('--')) {
            dom.style.setProperty(sKey, sVal);
          } else {
            dom.style[sKey] = sVal;
          }
        });
      } else if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.substring(2).toLowerCase();
        dom.addEventListener(eventName, value);
      } else if (key === 'value' && (vnode.type === 'input' || vnode.type === 'select' || vnode.type === 'textarea')) {
        dom.value = value;
      } else if (key === 'checked' && vnode.type === 'input') {
        dom.checked = Boolean(value);
      } else if (key === 'autoFocus') {
        setTimeout(() => dom.focus(), 20);
      } else if (value !== null && value !== undefined && value !== false) {
        const attrName = key === 'viewBox' ? 'viewBox' : (key === 'strokeWidth' ? 'stroke-width' : (key === 'strokeLinecap' ? 'stroke-linecap' : (key === 'strokeLinejoin' ? 'stroke-linejoin' : (key === 'strokeDasharray' ? 'stroke-dasharray' : (key === 'strokeDashoffset' ? 'stroke-dashoffset' : key)))));
        dom.setAttribute(attrName, value);
      }
    });

    if (children) {
      if (Array.isArray(children)) {
        children.forEach(child => dom.appendChild(renderVNode(child)));
      } else {
        dom.appendChild(renderVNode(children));
      }
    }

    return dom;
  }

  const ReactDOM = {
    createRoot(container) {
      return {
        render(vnode) {
          container.innerHTML = '';
          const dom = renderVNode(vnode);
          container.appendChild(dom);
        }
      };
    },
    render(vnode, container) {
      container.innerHTML = '';
      const dom = renderVNode(vnode);
      container.appendChild(dom);
    }
  };

  window.React = React;
  window.ReactDOM = ReactDOM;
})();
