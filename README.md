# MultiEnvImpl

Shared implementations for both Node and Browser based on Templates

A really minimal implementation of utils that may be needed on both browser and node. 

Currently supports:

- Fetch (FetchAPI for Browser, Http for Node)
- Events (EventTarget for Browser, EventEmitter for Node) 
- FileManager (fs for Node, browser doesn't have an implementation yet because of how user is now required to give file access permission).

It works by checking the env which the lib is installed on, and then uses the correct implementation, 
considering that both implementations may have a different syntax, 
a template is predefined and this provides the available options to use to the oustide.
