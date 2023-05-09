<script>
	let questions = [
		{
			"question": "What type of coffee represents about 60% of global coffee production, tastes better and is more finicky to grow?",
			"options": [
				"Arabica",
				"Robusta"
			],
			"correctIndex": 0,
			"explanation" : "Arabica coffee is known for its sweeter, more complex taste with lower caffeine content, grown at higher altitudes in nutrient-rich soil, and accounts for about 60% of global coffee production. Robusta coffee, on the other hand, has a stronger, more bitter taste with higher caffeine content, is grown at lower altitudes in hotter climates, and accounts for about 40% of global coffee production."
		},
		{
			"question": "What altitude do coffee plants grow in?",
			"options": [
				"0-1000 ft above sea level",
				"1000-2000 ft above sea level",
				"3000-5000 ft above sea level",
				"Above 7000 ft above sea level"
			],
			"correctIndex": 1,
			"explanation" : "Coffee plants grow between 3,000 and 6,000 feet above sea level. Some experts may argue that high elevations produce a better harvest with more flavorful beans."
		},
		{
			"question": "What is the ideal temperature range for coffee farming?",
			"options": [
				"0 - 5 C",
				"5 - 15 C",
				"15 - 20 C",
				"20 - 30 C"
			],
			"correctIndex": 2,
			"explanation" : "The optimal temperature range of the Coffea arabica tree—source of 70% of the world's coffee—is 64°–70°F (18°C–21°C), while it can tolerate up to 73°F (24°C)."
		},
		{
			"question": "What is the optimal annual rainfall for coffee plants?",
			"options": [
				"0 - 1000 mm",
				"1000 - 1500 mm",
				"2000 - 2500 mm",
				"3000 - 4000 mm"
			],
			"correctIndex": 1,
			"explanation" : "An annual rainfall of 1 to 1.5 meters that is spread evenly throughout the year is ideal. However, some plants tolerate different conditions depending on the growing region and plant type."
		},
		{
			"question": "How much sunlight is ideal for coffee plants?",
			"options": [
				"The more shade, the better",
				"Direct sunlight at all times",
				"Part sunlight, part shade",
				"They thrive under any condition"
			],
			"correctIndex": 2,
			"explanation" : "Farmers are careful to plant in areas where the coffee will not get full sunlight. Instead, coffee requires ample sunlight for part of the day with shade for the rest."
		}
	];
	let answers = new Array(questions.length).fill(null);
	let questionPointer = -1;
	function getScore(){
		let score = answers.reduce((acc,val,index)=>{
			if(questions[index].correctIndex == val){
				return acc+1;
			}
			return acc;
		},0);
		return (score/questions.length * 100)+"%";
	}
	function restartQuiz(){
		answers = new Array(questions.length).fill(null);
		questionPointer = 0;
	}
  
	let result = "";	
	let shake = -1;
	
	async function checkAnswer(i) {
    if (answers[questionPointer] === null) {
      answers[questionPointer] = i;
			if (answers[questionPointer] === questions[questionPointer].correctIndex) {
      result = "Great job!\n" + questions[questionPointer].explanation;
    } else {
      result = "Not quite.\n" + questions[questionPointer].explanation;
			shake = i;
			await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms
			shake = -1;
      }
    }
  }
	

</script>

<div class="app">
	{#if questionPointer==-1}
		<div class="start-screen">
			<h1>
				How well do you know your coffee? 
			</h1>
      <p>Choose the right conditions for your coffee farm!</p>
      <img class="coffeeplant" src="./images/coffeeplant.jpg" alt="plant" width="300" />
			<button on:click={()=>{questionPointer=0}}>
				Start Quiz
			</button>	
		</div>
	{:else if !(questionPointer > answers.length-1)}
		<div class="quiz-screen">
			<div class="main">
				<h2>
					{questions[questionPointer].question}
				</h2>
				<div class="options">
					{#each questions[questionPointer].options as opt,i}
						<button 
								class="{answers[questionPointer] == i ? 'selected' : ''} {answers[questionPointer] !== null && questions[questionPointer].correctIndex == i && answers[questionPointer] !== questions[questionPointer].correctIndex ? 'correct' : ''} {shake == i ? 'shake' : ''}"
								on:click={() => {checkAnswer(i)}}
								disabled={answers[questionPointer] !== null}
						>
							{opt}
						</button>
					{/each}
				</div>
				<p>{result}</p>
				<button
					class="next-button"
					on:click={() => { questionPointer++; result = ""; }}
					disabled={answers[questionPointer] === null}
				>
					Next
				</button>
			</div>
			<div class="footer">
				<div class="progress-bar">
					<div style="width:{questionPointer/questions.length *100}%">
					</div>
				</div>
				<div class="buttons">
					<button disabled={questionPointer==0} on:click={()=>{questionPointer--}}>
						&lt;
					</button>
					<button on:click={()=>{questionPointer++}}>
						&gt;
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="score-screen">
			<h1>
				Your score: {getScore()}
			</h1>
			<button on:click={restartQuiz}>
				Restart Quiz
			</button>
		</div>
	{/if}
</div>

<style>

@import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
	.app {
		position:relative;
		top:0px;
		left:0px;
		width:70vw;
		height:80vh;
    max-width: 800px;
		font-family: 'Space Mono', monospace;
    font-size: 16px;
	}
	.app > div {
		width:100%;
		height:100%;
	}
	.app .start-screen,
	.app .score-screen{
		display:flex;
		justify-content:center;
		align-items:center;
		
	}
	.app .start-screen button,
	.app .score-screen button,
	.app .quiz-screen .next-button {
		padding:10px 30px;
		background:#FFFFFF;
		color:#000000;
		border:solid;
		border-width: 3px;
		border-color:#000000;
/* 		outline:solid; */
		border-radius:0px;
		cursor:pointer;
		margin: 20px auto;
		display:block;
    font-family: 'Space Mono', monospace;
    font-size: 16px;
		
	}
	
	.app .start-screen button:hover,
	.app .score-screen button:hover,
	.app .quiz-screen .next-button:hover {
      background-color:#000000;
			color: #FFFFFF;
      transition: 0.2s;
  }
	
	.app .quiz-screen .next-button:disabled {
		background: #FFFFFF;
    color: #FFFFFF;
		border-color:#FFFFFF;
    cursor: default;
		text-align: center;
	}
	.app .quiz-screen .main{
		padding:50px;
	}
	.app .quiz-screen .main .options {
		display:flex;
		justify-content:space-between;
		flex-wrap:wrap;
	}
	.app .quiz-screen .main .options button {
		width:45%;
		border: none;
		border-radius:50px;
		margin:10px 0px;
		padding: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 16px;
	}
	.app .quiz-screen .main .options button:hover {
		background-color:#B3D3C5;
		color: #FFFFFF;
    transition: 0.2s;
    cursor:pointer;
	}

  .app .quiz-screen .main .options button:disabled {
		background-color:#D1D1D1;
		color: #FFFFFF;
    cursor:default;
	}
	.app .quiz-screen .main .options button.selected {
		background:#1A6444;
		color:#FFFFFF;
	}

  .app .quiz-screen .main .options button.correct {
    background: #AF897E;
    color: #fff;
  }

	.app .quiz-screen .footer {
		position:absolute;
		bottom:0px;
		left:0px;
		width:100%;
		height:50px;
		/* display:flex;
		justify-content:space-between; */
		align-items:center;
	}
	.app .quiz-screen .footer > div {
		margin:0px 10px;
	}
	.app .quiz-screen .footer .progress-bar {
		width:200px;
		height:14px;
		background:#E5E5E5;
		border-radius:10px;
		overflow:hidden;
    display:block;
    margin: 10px auto;
	}
	.app .quiz-screen .footer .progress-bar div {
		height:100%;
		background:#1A6444;
	}

  .app .quiz-screen .footer .buttons button {
    border: none;
    background:#FFF;
    color: black;
    font-size: 18px;
    margin: 10px auto;
  }

  .app .quiz-screen .footer .buttons button:hover {
    border: none;
    background:#FFF;
    cursor:pointer;
    color: gray
  }
	.app .score-screen,
	.app .start-screen {
		flex-direction:column;
		margin: 0px;
	} 
	.app .score-screen h1 {
		margin: 50px;
	}

  .app .start-screen h1 {
    margin: 10px;
  }
	
  .shake {
    animation: shake 0.5s linear;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
  }

  img {
    margin: 0px auto 30px;
  }
  h2 {
    margin: 0 auto 45px;
  }
</style>