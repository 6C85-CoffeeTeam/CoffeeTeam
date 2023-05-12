<script>
	export let tooltipText, xAxis, yAxis;
  </script>
  
  <div class="tooltip" role="tooltip" style="left: {xAxis}px; top: {yAxis}px;">
	{tooltipText}
  </div>
  
  <style>
	  .tooltip {
		  color: #fff;
		  min-width: 80px;
		  max-width: 250px;
		  position: absolute;
		  padding: 0.5rem 0.75rem;
		  text-align: center;
		  font-weight: 400;
		  font-size: 0.7rem;
		  line-height: 1.2;
		  border-radius: 0.25rem;
		  background-color: rgba(0, 0, 0, 0.8);
  }
  .tooltip:before {
	content: "";
	position: absolute;
	bottom: -5px;
	left: 50%;
	width: 0;
	border-top: 5px solid rgba(0, 0, 0, 0.8);
	border-right: 5px solid transparent;
	border-left: 5px solid transparent;
	font-size: 0;
	line-height: 0;
  }

  </style>