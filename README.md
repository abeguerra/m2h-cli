# Mailchimp Take Home Project

CLI implementation of the mailchimp take-home project

## Table of Contents

- [Assumptions](#assumptions)
- [Features](#features)
- [Wish List](#wish-list)
- [Requirements](#requirements)
- [Usage](#usage)

## Assumptions
1. If not outlined in the examples, I assumed expected behavior matches markdown standard. For example, space in from of # invalidated header markdown

## Features

Accepts markdown as input and produces html through a CLI with options for:
* providing markdown via terminal or file
* getting html via terminal or file

## Wish List
Given more time, I would've liked to:

* add error handling
* await convertFileToHTML in index.js
* integration tests for file transformations (dependent on above)
* explore better way of merging adjacent paragraphs
* add acceptance tests (exec m2h command)
* add typescript for better safety on types, args, etc
* consider other approaches to problem (focused on efficiency and extendability)

## Requirements

node v20+

## Install

If installing from source

`npm install -g`

## Usage

`m2h -md <markdown-string>`

`m2h -fin "./tests/transformations/sample4.txt" -fout "./tests/transformations/sample4.html"`