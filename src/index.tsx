import { DateNode } from './extensions/date';
import { Em } from './extensions/em';
import { ExpandClient } from './extensions/expand/client';
import { InlineCard } from './extensions/inline-card';
import { Media } from './extensions/media';
import { MediaSingleClient } from './extensions/media-single/client';
import { Panel } from './extensions/panel';
import { Rule } from './extensions/rule';
import { Status } from './extensions/status';
import { Strong } from './extensions/strong';
import { SubSup } from './extensions/subsup';
import { TextColor } from './extensions/text-color';
import { UndefinedNode } from './extensions/undefined';

export const Jira = [
  MediaSingleClient,
  ExpandClient,
  DateNode,
  Em,
  InlineCard,
  Media,
  Panel,
  Rule,
  Status,
  Strong,
  SubSup,
  TextColor,
  UndefinedNode,
];
