/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modal */ "./src/js/components/modal.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_modal__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/js/components/modal.js":
/*!************************************!*\
  !*** ./src/js/components/modal.js ***!
  \************************************/
/***/ (() => {

class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = '';
    this.animation = '';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = ['a[href]', 'input', 'select', 'textarea', 'button', 'iframe', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }
  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.path;
          let animation = clickedElement.dataset.animation;
          let speed = clickedElement.dataset.speed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 500;
          this._nextContainer = document.querySelector(`[data-target="${target}"]`);
          this.open();
          return;
        }
        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));
      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }
        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));
      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }
  }
  open(selector) {
    this.previousActiveElement = document.activeElement;
    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }
    this.modalContainer = this._nextContainer;
    if (selector) {
      this.modalContainer = document.querySelector(`[data-target="${selector}"]`);
    }
    this.modalContainer.scrollTo(0, 0);
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';
    this.disableScroll();
    this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation);

    // setTimeout(() => {

    // 	this.modalContainer.classList.add('animate-open');

    // }, 0);
    setTimeout(() => {
      this.modalContainer.classList.add('animate-open');
      this.options.isOpen(this);
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }
  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove(this.animation);
      this.modalContainer.classList.remove('modal-open');
      // setTimeout(() => {

      // }, this.speed);

      this.enableScroll();
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }
  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }
  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }
  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }
  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }
  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach(el => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }
  unlockPadding() {
    this._fixBlocks.forEach(el => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = new Modal({
    isOpen: modal => {
      console.log('opened');
    },
    isClose: () => {
      console.log('closed');
    }
  });

  // new Modal().open('second');
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");

const forms = document.querySelectorAll('form');
if (forms) {
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
    });
  });
}
const textarea = document.querySelector('.textarea');
if (textarea) {
  textarea.addEventListener('input', function () {
    // this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

    // Принудительное обновление стиля
    this.style.overflowY = 'hidden';
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".dropdown-btn");
  const dropdown = document.querySelector(".dropdown");
  if (button) {
    button.addEventListener("click", function () {
      dropdown.classList.toggle("show");
      button.classList.toggle("active");
    });
  }

  // Закрытие dropdown при клике вне его области
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
      button.classList.remove("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".actions-open");
  const actions = document.querySelector(".actions");
  button.addEventListener("click", function () {
    actions.classList.toggle("show");
    button.classList.toggle("show");
  });

  // Закрытие dropdown при клике вне его области
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !actions.contains(event.target)) {
      actions.classList.remove("show");
      button.classList.remove("show");
    }
  });
});

// script.js

// Проверяем предпочитаемую тему пользователя и устанавливаем тему на странице
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Слушаем изменения системных настроек и переключаем тему в реальном времени
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
  if (e.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});
})();

/******/ })()
;