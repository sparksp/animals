/**
 * Animals (c) Phill Sparks 2009
 */
function Animal(name) {
	this.name = name;
}
Animal.prototype.getName = function() {
	return this.name;
}
Animal.prototype.getAName = function() {
	return "a" + ("aeiou".indexOf(this.name[0].toLowerCase()) != -1 ? "n " : " " ) + this.name;
}
Animal.prototype.toString = function() {
	return this.name;
}
Animal.prototype.stringify = function() {
	return "'" + this.name + "'";
}

function Question(name, yes, no) {
	this.yes  = yes;
	this.no   = no;
	this.name = name;

	if (this.name[this.name.length - 1] != '?') this.name += '?';
}
Question.prototype = new Animal;
Question.prototype.stringify = function() {
	return "{'question': '" + this.name + "', 'yes': " + this.yes.stringify() + ", 'no': " + this.no.stringify() + "}";
}


var Animals = {};
Animals.top = new Question('', new Animal('Goldfish'), null);
Animals.top.stringify = function() {
	if (this.yes instanceof Question)
		return this.yes.stringify();
	else
		return "[" + this.yes.stringify() + "]";
}

Animals.run = function() {

	var last     = Animals.top;
	var lastyn   = true;
	var current  = Animals.top.yes;

	alert('Think of an animal and I will try to guess it...');

	while (current instanceof Question) {
		last = current;
		if (lastyn = confirm(current.getName()))
			current = current.yes;
		else
			current = current.no;
	}

	// current instanceof Animal
	if (confirm('Is it ' + current.getAName() + '?')) {
		alert('I guessed right!');
	}
	else {
		var name = prompt('Hmm, then what is it?');
		if (name != null) {
			var newAnimal = new Animal(name);
			
			var question = prompt('What question can I use to tell the difference between ' + current.getAName() + ' and ' + newAnimal.getAName() + '?');
			if (question != null) {
				var newQuestion;
				if (yn = confirm('How would you answer this question for ' + newAnimal.getAName() + '?'))
					newQuestion = new Question(question, newAnimal, current);
				else
					newQuestion = new Question(question, current, newAnimal);

				if (lastyn)
					last.yes = newQuestion;
				else
					last.no  = newQuestion;
			}
		}
	}

	Animals.debug();

	if (confirm('Would you like another go?'))
		Animals.run();

}

Animals.debug = function() {
	firebug.d.console.clear();
	firebug.d.console.cmd.dir(eval("(" + Animals.top.stringify() + ")"));
}

Animals.init = function() {
	document.getElementById('cmdRun').focus();
	Animals.debug();
}
