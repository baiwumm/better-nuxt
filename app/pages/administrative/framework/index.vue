<script setup lang="ts">
import type { UserProps } from '@nuxt/ui'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { buildFlowData, layoutGraph } from './utils'

const siteConfig = useSiteConfig()
const { getDepartmentList } = useAdministrativeApi()
const { getUserDisplayName } = useCurrentUser()

// 获取部门列表
const { data } = await useAsyncData(
  'framework-tree',
  async () => {
    const res = await getDepartmentList()
    return buildFlowData([
      {
        id: 'root',
        name: siteConfig.name,
        description: siteConfig.description,
        children: res?.data ?? [],
      },
    ])
  },
)

const flowData = computed(() => {
  if (!data.value) {
    return {
      nodes: [],
      edges: [],
    }
  }

  // 避免修改原始数据
  const nodes = structuredClone(data.value.nodes)
  const edges = structuredClone(data.value.edges)

  layoutGraph(nodes, edges)

  return {
    nodes,
    edges,
  }
})

function getUserProps(u: User): UserProps {
  if (!u) {
    return {}
  }
  const userName = getUserDisplayName(u)
  return {
    name: userName,
    description: userName === u.email ? undefined : u.email,
    avatar: {
      src: u.image || undefined,
      alt: userName?.slice(0, 2).toUpperCase(),
      loading: 'lazy' as const,
    },
  }
}
</script>

<template>
  <div class="flex-1 w-full">
    <ClientOnly>
      <VueFlow
        :nodes="flowData.nodes"
        :edges="flowData.edges"
        fit-view-on-init
        :min-zoom="0.2"
        :max-zoom="4"
      >
        <template #node-root="props">
          <UPageCard
            spotlight
            spotlight-color="primary"
            :ui="{ body: 'max-w-50' }"
          >
            <template #title>
              <NuxtImg src="/better-nuxt.svg" :alt="props.data.name" class="max-h-20" />
            </template>
          </UPageCard>
        </template>
        <template #node-department="props">
          <UPageCard :title="props.data.name">
            <template v-if="props.data.code" #description>
              <UBadge variant="soft">
                {{ props.data.code }}
              </UBadge>
            </template>
            <template v-if="props.data.leader" #footer>
              <UUser v-bind="getUserProps(props.data.leader)" />
            </template>
          </UPageCard>
        </template>
        <Background />
        <Controls position="top-left" />
        <MiniMap />
      </VueFlow>
    </ClientOnly>
  </div>
</template>
