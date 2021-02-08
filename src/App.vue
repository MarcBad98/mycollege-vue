<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          MyCollege
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: '#' }">
          Placeholder
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item>
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
      </template>
    </b-navbar>
    <div class="section container">
      <div class="content box">
        <router-view />
      </div>
    </div>
  </div>
</template>
