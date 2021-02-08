<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          MyCollege
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: 'Jobs' }">
          Jobs
        </b-navbar-item>
        <b-navbar-dropdown label="Skills">
          <b-navbar-item
            tag="router-link"
            :to="{
              name: 'Skills',
              query: { skill: 'Beginner\'s Guide to Web Development' }
            }"
          >
            Beginner's Guide to Web Development
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{
              name: 'Skills',
              query: { skill: 'JavaScript' }
            }"
          >
            JavaScript
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{
              name: 'Skills',
              query: { skill: 'Python' }
            }"
          >
            Python
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{
              name: 'Skills',
              query: { skill: 'REST vs GraphQL' }
            }"
          >
            REST vs GraphQL
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{
              name: 'Skills',
              query: { skill: 'Productivity while Working from Home' }
            }"
          >
            Productivity while Working from Home
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-input
            placeholder="Search for People"
            type="search"
            icon="magnify"
            icon-clickable
            rounded
          ></b-input>
        </b-navbar-item>
        <b-navbar-item tag="div" v-if="!$keycloak.authenticated">
          <div class="buttons">
            <b-button
              type="is-primary"
              v-on:click="$keycloak.keycloak.register()"
            >
              Sign Up
            </b-button>
            <b-button type="is-light" v-on:click="$keycloak.keycloak.login()">
              Log In
            </b-button>
          </div>
        </b-navbar-item>
        <b-navbar-item tag="div" v-else>
          <b-button type="is-light" v-on:click="$keycloak.keycloak.logout()">
            Log Out
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="section container">
      <div class="content box">
        <router-view />
      </div>
    </div>
  </div>
</template>
