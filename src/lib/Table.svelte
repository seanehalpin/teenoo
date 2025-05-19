<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  import Text from './Text.svelte';

  type TableRow = Record<string, string>;

  let {
    onclick = (event: MouseEvent, linkName: string) => {},
    data = [
      {
      name: "Send interactive messages in Slack",
      status: "Enabled",
      edited: "~4 hours ago",
      created: "11d ago"
      },
      {
        name: "DM User in Slack",
        status: "Enabled",
        edited: "~1 day ago",
        created: "1m ago"
      },
      {
        name: "Get weather for a location",
        status: "Enabled",
        edited: "~10 hours ago",
        created: "20d ago"
      }
    ] as TableRow[],
    className = "",
  } = $props<{
    onclick?: (event: MouseEvent, linkName: string) => void;
  }>();

  // Extract column headers from the first row if available
  let headers = $derived(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  });

  function handleClick(event: MouseEvent, linkName: any) {
    onclick(event, linkName);
  }

  
</script>

<StyleProvider>
  <div class="table-container {className}">
    <table class="tino-table">
      <thead>
        <tr>
          {#each headers() as header}
            <th>
              <Text small strong>{header}</Text>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row}
          <tr onclick={(e) => handleClick(e, row)}>
            {#each headers() as key}
              <td>
                <Text>{row[key]}</Text>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</StyleProvider>

<style lang="scss">
  .table-container {
    font-family: var(--font-base);
    width: 100%;
    overflow-x: auto;
    box-sizing: border-box;
  }

  .tino-table {
    box-sizing: border-box;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: var(--font-base);
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--12px);
    overflow: hidden;
    
    th, td {
      text-align: left;
      vertical-align: middle;
      line-height: 1.4;

      &:first-child {
        padding-left: var(--32px);
      }
    }

  
    th {
      color: var(--ds-textSecondary);
      background: var(--ds-surfacePrimary);
      border-bottom: 1px solid var(--ds-borderPrimary);
      font-weight: 500;
      height: 50px;
      text-transform: capitalize;
    }

    td {
      color: var(--ds-textPrimary);
      padding: var(--32px) 0;
      background: var(--ds-surfacePrimary);
    }
    
    tbody tr {
      &:hover {
        td {
          background: var(--ds-surfaceSecondary);
        }
      }
      
      td {
        border-bottom: 1px solid var(--ds-borderPrimary);
        height: var(--40px);
      }

      &:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
</style>