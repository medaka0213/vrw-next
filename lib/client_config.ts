import { TimeRange } from 'react-vrw';

type SEARCH_MODE_TYPE = {
  label: string;
  value: string;
  divider?: boolean;
  type: 'number' | 'string' | 'datetime';
  enabled?: boolean;
};

type SEARCH_ITEM_TYPE = {
  [key: string]: SEARCH_MODE_TYPE[];
  mission: SEARCH_MODE_TYPE[];
  meetup: SEARCH_MODE_TYPE[];
};

export const SEARCH_ITEMS: SEARCH_ITEM_TYPE = {
  mission: [
    {
      label: '日時',
      value: 'datetime',
      type: 'datetime',
      enabled: false,
    },
    {
      label: 'ミッション名',
      value: 'name',
      type: 'string',
      enabled: false,
    },
    {
      label: 'ロケット',
      value: 'rocket',
      type: 'string',
      enabled: false,
    },
    {
      label: '発射場',
      value: 'site',
      type: 'string',
      enabled: false,
    },
    {
      label: '打ち上げ事業者',
      value: 'provider',
      type: 'string',
      enabled: false,
    },
    {
      label: '概要',
      value: 'overview',
      type: 'string',
      enabled: false,
    },
  ],
  meetup: [
    {
      label: '日時',
      value: 'datetime',
      type: 'datetime',
      enabled: false,
    },
    {
      label: '集会タイトル',
      value: 'title',
      type: 'string',
      enabled: false,
    },
    {
      label: 'JOIN先',
      value: 'user',
      type: 'string',
      enabled: false,
    },
  ],
};

type DEFAULT_QUERY_TYPE = {
  [key: string]: () => { key: string; value: string }[];
  mission: () => { key: string; value: string }[];
};

export const DEFAULT_QUERY: DEFAULT_QUERY_TYPE = {
  mission: () => [
    {
      key: 'datetime',
      value: TimeRange.fromMode(new Date(), 'WEEK_TEIKI')
        .toString('datetime')
        .replace('datetime=', ''),
    },
    {
      key: 'limit',
      value: '1000',
    },
  ],
  meetup: () => [
    {
      key: 'datetime',
      value: TimeRange.fromMode(new Date(), 'WEEK_TEIKI')
        .toString('datetime')
        .replace('datetime=', ''),
    },
    {
      key: 'limit',
      value: '1000',
    },
  ],
};

export const getDefaultQuery = (type: string) => {
  if (DEFAULT_QUERY.hasOwnProperty(type)) {
    // 値が関数なら実行
    if (typeof DEFAULT_QUERY[type] === 'function') return DEFAULT_QUERY[type]();
  }
  return [
    {
      key: 'limit',
      value: 100,
    },
  ];
};

export const getSearchItems = (type: string) => {
  if (SEARCH_ITEMS.hasOwnProperty(type)) {
    return SEARCH_ITEMS[type];
  }
  return [];
};
