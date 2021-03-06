"use strict";

var app = app || {};
(function() {
    "use strict";

    app.TodoModel = function( key ) {
        this.key = key;
        this.todos = app.Utils.store( key );
        this.onChanges = [];
    };
    app.TodoModel.prototype.subscribe = function( onChange ) {
        this.onChanges.push( onChange );
    };
    app.TodoModel.prototype.inform = function() {
        app.Utils.store( this.key, this.todos );
        this.onChanges.forEach(function( cb ) {
            cb();
        });
    };
    app.TodoModel.prototype.addTodo = function( title ) {
        this.todos = this.todos.concat({
            id: app.Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    };
    app.TodoModel.prototype.toggleAll = function( checked ) {
        this.todos = this.todos.map(function( todo ) {
            return app.Utils.extend({}, todo, { completed: checked });
        });
        this.inform();
    };
    app.TodoModel.prototype.toggle = function( todoToToggle ) {
        this.todos = this.todos.map(function( todo ) {
            return todo !== todoToToggle ? todo :
                app.Utils.extend({}, todo, { completed: !todo.completed });
        });
        this.inform();
    };
    app.TodoModel.prototype.destroy = function( todo ) {
        this.todos = this.todos.filter(function( candidate ) {
            return candidate !== todo;
        });
        this.inform();
    };
    app.TodoModel.prototype.save = function( todoToSave, text ) {
        this.todos = this.todos.map(function( todo ) {
            return todo !== todoToSave ? todo :
                app.Utils.extend({}, todo, { title: text });
        });
        this.inform();
    };
    app.TodoModel.prototype.clearCompleted = function() {
        this.todos = this.todos.filter(function( todo ) {
            return !todo.completed;
        });
        this.inform();
    };
})();
