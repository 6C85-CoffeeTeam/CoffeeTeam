import Tooltip from './Tooltip.svelte';

export const tooltip = (el) => {

  let tooltipText, tooltipComponent;

  const addTooltip = () => {
    tooltipText = el.getAttribute('data-tooltip');

    tooltipComponent = new Tooltip({
			target: document.body,
      props: {
				tooltipText,
        xAxis: 0,
        yAxis: 0
			}
		});

    const tooltipDiv = document.querySelectorAll('.tooltip');
    let parentCoords = el.getBoundingClientRect();

    tooltipDiv.forEach( (i) => {
			
      let top = parseInt(parentCoords.top) + window.scrollY - i.offsetHeight - 10;
      let bottom = parseInt(parentCoords.bottom) + window.scrollY + 10;
      let left = parseInt(parentCoords.left) + window.scrollX;
      let right = parseInt(parentCoords.right) + window.scrollX - i.offsetWidth;
      let center = parseInt(parentCoords.left) + window.scrollX + (el.offsetWidth - i.offsetWidth) / 2;

      tooltipComponent.$set({
        xAxis: center,
        yAxis: top
      });

      // Position Value Offset
      let tooltipOffsetTop = parentCoords.top - i.offsetHeight;
      let tooltipOffsetRight = window.innerWidth - i.offsetWidth - parentCoords.right;
			let tooltipOffsetLeft = parentCoords.left - i.offsetWidth;

      // Conditionals to align based on screen position/size
      if (tooltipOffsetTop <= 0) {
        i.classList.add('bottom');
        tooltipComponent.$set({
          yAxis: bottom
        })
      }

      if (tooltipOffsetRight <= 0) {
        i.classList.add('right');
        tooltipComponent.$set({
          xAxis: right
        })
      }

      if (tooltipOffsetLeft <= 0) {
        i.classList.add('left');
        tooltipComponent.$set({
          xAxis: left
        })
      }
    });

  }

  const removeTooltip = () => {
    tooltipComponent.$destroy();
  }

  el.addEventListener('mouseover', addTooltip);
  el.addEventListener('mouseout', removeTooltip);

  return {
		destroy() {
			el.removeEventListener('mouseover', addTooltip);
      el.removeEventListener('mouseout', removeTooltip);
		}
	}
}
