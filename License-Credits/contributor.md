---
title: Contributors Acknowledgement
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const contributors = [
  {
    avatar: 'https://github.com/xFanexx.png',
    name: 'xFanexx',
    title: 'Owner',
    links: [
      { icon: 'github', link: 'https://github.com/xFanexx' }
    ]
  },
  {
    avatar: 'https://github.com/Sacul0457.png',
    name: 'Sacul0457',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Sacul0457' }
    ]
  },
  {
    avatar: 'https://github.com/Chandramauli-Arm64.png',
    name: 'Chandramauli',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/Chandramauli-Arm64' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Contributors
    </template>
    <template #lead>
      These awesome people have helped build this project.
    </template>
  </VPTeamPageTitle>

  <VPTeamMembers :members="contributors" />
</VPTeamPage>
