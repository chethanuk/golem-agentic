declare module 'golem:agent/common' {
  import * as golemRpc021Types from 'golem:rpc/types@0.2.1';
  export type WitType = golemRpc021Types.WitType;
  export type ParameterValue = {
    tag: 'text'
    val: string
  };
  export type DataValue = {
    tag: 'text'
    val: string
  } |
  {
    tag: 'structured'
    val: ParameterValue[]
  };
  export type TextType = {
    languageCode: string;
  };
  export type ParameterType = {
    tag: 'wit'
    val: WitType
  } |
  {
    tag: 'text'
    val: TextType
  };
  export type Structured = {
    parameters: ParameterType[];
  };
  export type Multimodal = {
    text: TextType[] | undefined;
  };
  export type DataSchema = {
    tag: 'structured'
    val: Structured
  } |
  {
    tag: 'multimodal'
    val: Multimodal
  };
  export type AgentConstructor = {
    name: string | undefined;
    description: string;
    promptHint: string | undefined;
    inputSchema: DataSchema;
  };
  export type AgentMethod = {
    name: string;
    description: string;
    promptHint: string | undefined;
    inputSchema: DataSchema;
    outputSchema: DataSchema;
  };
  export type AgentDependency = {
    agentName: string;
    methods: AgentMethod[];
  };
  export type AgentType = {
    typeName: string;
    description: string;
    agentConstructor: AgentConstructor;
    methods: AgentMethod[];
    requires: AgentDependency[];
  };
  export type ProgressCounter = {
    steps: number;
    total: number;
  };
  export type ProgressReport = {
    description: string;
    counter: ProgressCounter | undefined;
  };
  export type Error = {
    tag: 'network-error'
  };
  export type StatusUpdate = {
    tag: 'error'
    val: Error
  } |
  {
    tag: 'progress'
    val: ProgressReport | undefined
  } |
  {
    tag: 'emit'
    val: string
  };
}
